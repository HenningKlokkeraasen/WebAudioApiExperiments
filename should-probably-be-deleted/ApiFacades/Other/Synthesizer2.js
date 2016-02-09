
/*


	Synthesizer
	Works with VCOs and VCAs



function Synthesizer2(audioContext, voiceFacade,id) {
	this.audioContext = audioContext;
	this.voiceFacade = voiceFacade;
	this.id=id;
	return this;
};

// A note is typically triggered by a keyCode from a computer keyboard
// so that each key on the keyboard controls a voice (an instance of a VCO, VCA, etc)
Synthesizer2.prototype.startPlaying = function(note) {
	//this.ensureAll();

	// Reset
	////this.stopPlaying(note);

	var freq = this.getFrequency(note);
	
	// Play the note
	this.start(freq, note);

	this.currentlyPlayingNotes.push(note);

	console.log('Synth ' + this.id + ' - started playing a ' + note + ' at octave ' + this.currentOctave);

	// Set that this note is the one that should be controlled 
	// when detune is triggered
	if (!this.isDetuning)
		this.detuningNote = note;

	return this;
};

Synthesizer2.prototype.stopPlaying = function(note) {
	

	// Stop playing the note
	this.stop(note);

	this.currentlyPlayingNotes[note] = null;

	//console.log('Synth - stopped playing ' + note + ' ' + this.currentOctave);

	// Stop detuning
	if (this.detuningNote == note)
		this.isDetuning = false;

	return this;
};

Synthesizer2.prototype.detune = function(val) {
	

	this.isDetuning = true;

	var synth = this;
	var counter = 1;
	
		if (synth.currentlyControllingOsc == 0 || synth.currentlyControllingOsc == counter) {
			this.voiceFacade.pitchBendIsh(val, synth.detuningNote);
			//console.log('Synth - Set VCO ' + counter + ' pitchbend value ' + val);
		}
		counter++;
	
	return this;
};

Synthesizer2.prototype.resetDetune = function() {
	

	this.isDetuning = false;

	var synth = this;
	var counter = 1;
	
		if (synth.currentlyControllingOsc == 0 || synth.currentlyControllingOsc == counter) {
			this.voiceFacade.setDetune(1, synth.detuningNote);
			//console.log('Synth - Set VCO ' + counter + ' detune to 1');
		}
		counter++;
	
};

Synthesizer2.prototype.setOctave = function(octave) {
	

	console.log('Synth - setOctave to ' + octave);
	this.currentOctave = octave;

	var synth = this;
	var counter = 1;
	
		if (synth.currentlyControllingOsc == 0 || synth.currentlyControllingOsc == counter) {
			synth.currentlyPlayingNotes.forEach(function(note) {
				var freq = synth.getFrequency(note);
				synth.voiceFacade.setFrequency(freq, note);
				//console.log('Synth - Set VCO ' + counter + ' note ' + note + ' to frequency ' + freq);
			});
		}
		counter++;
	
	return this;
};

Synthesizer2.prototype.setWaveType = function(waveType) {
	

	console.log('Synth - setWaveType to ' + waveType);
	
	var synth = this;
	var counter = 1;
	
		if (synth.currentlyControllingOsc == 0 || synth.currentlyControllingOsc == counter) {
			this.voiceFacade.setType(waveType);
			//console.log('Synth - Set VCO ' + counter + ' to wave type ' + waveType);
		}
		counter++;
	
	return this;
};

Synthesizer2.prototype.setOscillatorToControl = function(number) {
	console.log('Synth - osc to control is ' + number);
	this.currentlyControllingOsc = number;
};



//
// private members
//



Synthesizer2.prototype.detuningNote = undefined;

Synthesizer2.prototype.isDetuning = false;

Synthesizer2.prototype.currentOctave = 4;

Synthesizer2.prototype.currentlyControllingOsc = 0; // default all

Synthesizer2.prototype.currentlyPlayingNotes = [];

// Frequencies for equal-tempered scale, A4 = 440 Hz
// this is ocatave number 4 in 0-8
Synthesizer2.prototype.noteToFrequencyTable = {
	'C' : 261.63,
		'C#' : 277.18,
	'D' : 293.66,
		'D#' : 311.13,
	'E' : 329.63,
	'F' : 349.23,
		'F#' : 369.99,
	'G' : 392.00,
		'G#' : 415.30,
	'A' : 440,
		'A#' : 466.16,
	'B' : 493.88,

	'C2' : 523.25,
		'C#2' : 554.37,
	'D2' : 587.33,
		'D#2' : 622.25,
};

// what to multiply the note at octave 4 with, to get the freq in the currentOctave
Synthesizer2.prototype.multiplierTable = {
	0 : 0.0625,
	1 : 0.125,
	2 : 0.25,
	3 : 0.5,
	4 : 1,
	5 : 2,
	6 : 3,
	7 : 4,
	8 : 5
};

Synthesizer2.prototype.getFrequency = function(note) {
	// Get the frequency corresponding to this note
	var freqUnmapped = this.noteToFrequencyTable[note];

	// Increase / decrease frequencey according to current octave
	var freq = freqUnmapped * this.multiplierTable[this.currentOctave];
	
	return freq;
};

//Synthesizer2.prototype.play = function(freq, note) {
	// To play with one VCO
	/*
	var vcos = [];
	var vcas = [];
	var audioContext = this.audioContext;

	var vco = new OscillatorFacade(audioContext)
		.setType(wave)
		.setFrequency(freq);
	console.log("Oscillator of wave " + 
		wave + 
		" starts playing at " +
		freq +
		"Hz ");
	
	vco.connect(audioContext.destination);
	vco.start();
	vcos.push(vco);
	return vcos;
	
//};

Synthesizer2.prototype.start = function(freq, note) {
	//this.allVoicesOnTheBoard.forEach(function(facade) { console.log(facade); });
	this.voiceFacade.setFrequency(freq, note);
	this.voiceFacade.gateOn(note);
};

Synthesizer2.prototype.stop = function(note) {
	this.voiceFacade.gateOff(note);
};

*/