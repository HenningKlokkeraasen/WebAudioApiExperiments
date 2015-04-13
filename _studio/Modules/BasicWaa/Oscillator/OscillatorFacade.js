/*
	Web Audio API wrapper - Oscillator
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/BasicWaa/Gain/GainFacade.js'
	], function(FacadeBase, GainFacade) {
		OscillatorFacade.prototype = Object.create(FacadeBase.prototype); // new FacadeBase2();
		OscillatorFacade.prototype.constructor = OscillatorFacade;

		function OscillatorFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			
			return this;
		};

		// private
		OscillatorFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createOscillator();
			// create a gain node as the output
			// this will be what is used for connections
			this.output = new GainFacade(this.audioContext);
			this.controlIn = this.input.frequency;
			this.controlOut = this.output.output;
		};

		// private
		OscillatorFacade.prototype.setDefaultValues = function() {
			this.input.start(0);
			this.output.setGain(0);

		};

		// private
		OscillatorFacade.prototype.wireUp = function() {
			this.input.connect(this.output.output);





		};

		OscillatorFacade.prototype.setType = function(type) {
			this.input.type = type;
			return this;
		};

		OscillatorFacade.prototype.setFrequency = function(frequency) {
			this.input.frequency.value = parseFloat(frequency);
			return this;
		};

		OscillatorFacade.prototype.setDetune = function(semitone) {
			this.input.detune.value = parseFloat(semitone); // * 100;
			return this;
		};

		OscillatorFacade.prototype.pitchBendIsh = function(detuneValue) {
			this.input.detune.value = this.input.detune.value + parseFloat(detuneValue)*10;
			return this;
		};

		OscillatorFacade.prototype.start = function() {
			//this.input.start(0);
			this.output.setGain(1);
			return this;
		};

		OscillatorFacade.prototype.stop = function() {
			//this.node.stop();

			// When an oscillator has stopped, it can not be started again. Create a new one ready to go.
			//this.node = this.audioContext.createOscillator();
			
			this.output.setGain(0);

			// create a gain node as the output
			// this will be what is used for connections
			//this.node.connect(this.gain.node);

			return this;
		};
		
		return OscillatorFacade;
	}
);