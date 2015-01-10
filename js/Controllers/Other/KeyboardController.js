
/*


	Controller for keyboard bindings
	
	
*/

function KeyboardController(synth) {
	this.synth = synth;
	//this.id = id;

    // Note: key/value pairs
    // (json objects)
    // must not be set as VoiceFacade.prototype.lfos = {} 
    // because that's a static property 
    // for ALL instances of VoiceFacade
	this.isPlaying = {};

	var self = this;
	$(document).keydown(function(e) {
		console.log("Handler for .keydown() called. key: " + e.keyCode);

		//console.log('keyboard controller ' + self.id + ' for ' + self.synth.voiceFacade.hasModulator + ' ' + self.synth.voiceFacade.hasFilter);

		// c,v,b,n : wave type
		if (e.keyCode in self.keyCodeToWaveTypeTable)
			self.synth.setWaveType(self.keyCodeToWaveTypeTable[e.keyCode]);

		// Number keys (top row not numpad) : change octave
		else if (e.keyCode in self.keyCodeToOctaveTable)
			self.synth.setOctave(self.keyCodeToOctaveTable[e.keyCode]);

		// Arrow keys: detune
		else if (e.keyCode in self.keyCodeToDetuneTable)
			self.synth.detune(self.keyCodeToDetuneTable[e.keyCode]);

		// Number keys (numpad not top row): change osc to control
		else if (e.keyCode in self.keyCodeToOscSelectorTable)
			self.synth.setOscillatorToControl(self.keyCodeToOscSelectorTable[e.keyCode]);

		// Play a note
		// This event is triggered recursively as long as the key is depressed
		// so we have to keep track of depressed keys
		else if (e.keyCode in self.keyCodeToNoteTable)
		{
			if (!self.isPlaying[e.keyCode]) {
				self.isPlaying[e.keyCode] = true;
				var note = self.keyCodeToNoteTable[e.keyCode];
				self.synth.startPlaying(note);
			}
			else {
				//console.warn(self.id + 'is already playing ' + e.keyCode);
			}
		}
	});
	$(document).keyup(function(e) {
		//console.log("Handler for .keyup() called. key: " + e.keyCode);

		// Arrow keys: reset detune
		if (e.keyCode in self.keyCodeToDetuneTable)
			self.synth.resetDetune();

		// Stop playing
		else if (self.isPlaying[e.keyCode])
		{
			self.isPlaying[e.keyCode] = false;
			var note = self.keyCodeToNoteTable[e.keyCode];
			self.synth.stopPlaying(note);
		}
	});
}

KeyboardController.prototype.keyCodeToWaveTypeTable = {
	67 /* which is the C key */ : 'sine',
	86 /* which is the V key */ : 'triangle',
	66 /* which is the B key */ : 'sawtooth',
	78 /* which is the N key */ : 'square'
};

// Number keys (top row not numpad)
KeyboardController.prototype.keyCodeToOctaveTable = {
	49 : 1,
	50 : 2,
	51 : 3,
	52 : 4,
	53 : 5,
	54 : 6,
	55 : 7,
	56 : 8,

	48 : 0,
};

// Number keys (top row not numpad)
KeyboardController.prototype.keyCodeToDetuneTable = {
	38 : 1,
	40 : -1
};

// this are keyCodes return for keydown and keyup, regardless of case state.
// keypress have keyCodes for upper case as well.
KeyboardController.prototype.keyCodeToNoteTable = {
	65 /* which is the A key */ : 'C',
		87 /* which is the W key */ : 'C#',
	83 /* which is the S key */ : 'D',
		69 /* which is the E key */ : 'D#',
	68 /* which is the D key */ : 'E',
	70 /* which is the F key */ : 'F',
		84 /* which is the T key */ : 'F#',
	71 /* which is the G key */ : 'G',
		89 /* which is the Y key */ : 'G#',
	72 /* which is the H key */ : 'A',
		85 /* which is the U key */ : 'A#',
	74 /* which is the J key */ : 'B',
	
	75 /* which is the K key */ : 'C2',
		79 /* which is the O key */ : 'C#2',
	76 /* which is the L key */ : 'D2',
		80 /* which is the P key */ : 'D#2',
	192/* which is the Ø key */ : 'E2',
	222/* which is the Æ key */ : 'F2',
		186/* which is the ¨ key */ : 'F#2',

};

// Number keys (numpad not top row)
KeyboardController.prototype.keyCodeToOscSelectorTable = {
	 96 : 0, // all oscillators
	 97 : 1,
	 98 : 2,
	 99 : 3,
	100 : 4,
	101 : 5,
	102 : 6,
	103 : 7,
	104 : 8,
	105 : 9
};