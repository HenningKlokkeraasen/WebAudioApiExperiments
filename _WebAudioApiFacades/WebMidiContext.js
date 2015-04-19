define([], function() {
	function WebMidiContext(noteOnCallback, noteOffCallback) {
		this._noteOnCallback = noteOnCallback;
		this._noteOffCallback = noteOffCallback;
		this.initMidi();
	}

	WebMidiContext.prototype = {
		initMidi: function() {
			if (navigator.requestMIDIAccess) {
				console.log('Web MIDI available');

				// Request access to user's MIDI devices

				// If sysex not required
				navigator.requestMIDIAccess()
					.then(this.midiAccessGranted.bind(this), this.midiAccessNotGranted.bind(this));

				// If sysex required
				// navigator.requestMIDIAccess( { sysex : true } )
				// 		.then( mySuccessCallback, myFailureCallback );
				
			} else {
				console.warn('No Web MIDI available');
			}
		},

		midiAccessGranted: function(MIDIAccess) {
			// console.log('User has granted MIDI access');
			// console.log(MIDIAccess);

			// var isSysexEnabledString = MIDIAccess.sysexEnabled ? 'Yes' : 'No';
			// console.log('Is SysEx enabled? ' + isSysexEnabledString);

			// Note 3: You have to restart Chrome after connecting/disconnecting a MIDI device.
			// so at this time useless to handle these events
			// MIDIAccess.onconnect = function() {
			// 	loadinputs(MIDIAccess);
			// 	loadoutputs(MIDIAccess);
			// };

			// MIDIAccess.ondisconnect = function() {
			// 	loadinputs(MIDIAccess);
			// 	loadoutputs(MIDIAccess);
			// };

			this.loadinputs(MIDIAccess);

			this.loadoutputs(MIDIAccess);
		},

		midiAccessNotGranted: function(error) {
			console.warn('MIDI access NOT granted');
			console.log(error);
		},

		loadinputs: function(MIDIAccess) {
			var inputs = MIDIAccess.inputs;

			var self = this;

			console.group();
			console.log('MIDI inputs:')
			inputs.forEach(function(input) {
				console.log(input);

				// Reload
				// Note 3: You have to restart Chrome after connecting/disconnecting a MIDI device.
				// so at this time useless to handle these events
				// input.ondisconnect = loadinputs;

				// Listen to MIDI events on the input
				input.onmidimessage = self.onMIDIMessageHandler.bind(self);

			});
			console.groupEnd();
		},

		loadoutputs: function(MIDIAccess) {
			var outputs = MIDIAccess.outputs;

			console.group();
			console.log('MIDI outputs:')
			outputs.forEach(function(output) {
				console.log(output);

				// Reload
				// Note 3: You have to restart Chrome after connecting/disconnecting a MIDI device.
				// so at this time useless to handle these events
				// output.ondisconnect = loadoutputs;

			});
			console.groupEnd();
		},

		onMIDIMessageHandler: function(event) {
			// var str = 'MIDI message received from ' + event.srcElement.name + ': ';
			// var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
			//console.log(event);

			// for (var i = 0; i < event.data.length; i++) {
			// 	str += "0x" + event.data[i].toString(16) + " ";
			// }
			// console.log(str);

			
			if (event.data[0] == 144) {
				var midiNoteNumber = event.data[1];
				var noteAndOctaveAndFrequency = this.getNoteAndOctaveAndFrequency(midiNoteNumber);
				this._noteOnCallback(noteAndOctaveAndFrequency.noteAndOctave, noteAndOctaveAndFrequency.frequency);
			}
			if (event.data[0] == 128) {
				var midiNoteNumber = event.data[1];
				var noteAndOctaveAndFrequency = this.getNoteAndOctaveAndFrequency(midiNoteNumber);
				this._noteOffCallback(noteAndOctaveAndFrequency.noteAndOctave, noteAndOctaveAndFrequency.frequency);
			}
		},

		getNoteAndOctaveAndFrequency: function(midiNoteNumber) {
			var noteIndex = this.getNoteIndex(midiNoteNumber);
			var octave = this.getOctaveFromMidiNoteNumber(midiNoteNumber);
			var note = this.getNoteFromMidiNoteNumber(noteIndex);
			var frequency = this.getFrequencyFromMidiNoteNumber(noteIndex, octave);
			// console.debug('note number ' + midiNoteNumber + ' has noteIndex ' + noteIndex + ' which resolves to the note ' + note + ' and the octave is ' + octave);
			return { 'noteAndOctave' : note + octave, 'frequency' : frequency };
		},

		getNoteIndex: function(midiNoteNumber) {
			return midiNoteNumber % 12;
		},

		getNoteFromMidiNoteNumber: function(noteIndex) {
			var note = this.noteTable[noteIndex];
			return note;
		},

		getFrequencyFromMidiNoteNumber: function(noteIndex, octave) {
			var baseFrequency = this.frequencyTable[noteIndex];
			var frequency = baseFrequency * this.frequencyMultiplierTable[octave];
			// console.debug('the frequency of this note in octave 4 is ' + baseFrequency + ', multiplied by the octave ' + octave + ', which gives ' + this.frequencyMultiplierTable[octave] + ', the frequency is ' + frequency);
			return frequency;
		},

		noteTable : {
			 0 : 'C',
			 1 : 'C#',
			 2 : 'D',
			 3 : 'D#',
			 4 : 'E',
			 5 : 'F',
			 6 : 'F#',
			 7 : 'G',
			 8 : 'G#',
			 9 : 'A',
			10 : 'A#',
			11 : 'B',
		},

		// Frequencies for equal-tempered scale, A4 = 440 Hz
		// this is ocatave number 4 in 0-8
		frequencyTable: {
			 0 : 261.63,	// C
			 1 : 277.18,	// C#
			 2 : 293.66,	// D
			 3 : 311.13,	// D#
			 4 : 329.63,	// E
			 5 : 349.23,	// F
			 6 : 369.99,	// F#
			 7 : 392.00,	// G
			 8 : 415.30,	// G#
			 9 : 440,		// A
			10 : 466.16,	// A#
			11 : 493.88		// B
		},

		getOctaveFromMidiNoteNumber: function(midiNoteNumber) {
			if (midiNoteNumber <= 11)
				return '-2';
			if (midiNoteNumber <= 23)
				return '-1';
			if (midiNoteNumber <= 35)
				return 0;
			if (midiNoteNumber <= 47)
				return 1;
			if (midiNoteNumber <= 59)
				return 2;
			if (midiNoteNumber <= 71)
				return 3;
			if (midiNoteNumber <= 83)
				return 4;
			if (midiNoteNumber <= 95)
				return 5;
			if (midiNoteNumber <= 107)
				return 6;
			if (midiNoteNumber <= 119)
				return 7;
			if (midiNoteNumber <= 127)
				return 8;
		},

		// what to multiply the note at octave 4 with, to get the freq in the currentOctave
		frequencyMultiplierTable: {
			'-2': 0.015625,
			'-1': 0.03125,
			0 : 0.0625,
			1 : 0.125,
			2 : 0.25,
			3 : 0.5,
			4 : 1,
			5 : 2,
			6 : 4,
			7 : 8,
			8 : 16
		}

	}

	return WebMidiContext;
});
