/*
	Web Audio API wrapper - FM oscillator (frequency modulation)
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js'
	], function(OscillatorFacade) {
		FmOscFacade.prototype = Object.create(OscillatorFacade.prototype); //new OscillatorFacade();
		FmOscFacade.prototype.constructor = FmOscFacade;

		function FmOscFacade(audioContext) {
			OscillatorFacade.call(this, audioContext); // base()

			return this;
		};

		// private
		FmOscFacade.prototype.initNodes = function() {
			OscillatorFacade.prototype.initNodes.call(this); // base()

			
			this.modulator = this.audioContext.createOscillator();
			this.modGain = this.audioContext.createGain();
		};

		// private
		FmOscFacade.prototype.setDefaultValues = function() {
			OscillatorFacade.prototype.setDefaultValues.call(this); // base()
			this.modulator.start(0);
			this.setModGain(1);
		};

		// private
		FmOscFacade.prototype.wireUp = function() {
			OscillatorFacade.prototype.wireUp.call(this); // base()
			this.modulator.connect(this.modGain);
			var carrier = this.input;
			this.modGain.connect(carrier.frequency); // control AudioParam


		};

		FmOscFacade.prototype.setFrequency = function(frequency) {
			this.input.frequency.value = parseFloat(frequency);
			this.syncModGain();
			return this;
		};

		FmOscFacade.prototype.setModFrequency = function(frequency) {
			this.modulator.frequency.value = parseFloat(frequency);
			return this;
		};

		FmOscFacade.prototype.setModWaveType = function(type) {
			this.modulator.type = type;
			return this;
		};

		FmOscFacade.prototype.setModGain = function(gain) {
			// The amplitude of the modulation
			this.modGain.gain.value = gain;
		};

		//private
		FmOscFacade.prototype.syncModGain = function() {
			//this.modGain.gain.value = this.node.frequency.value * 1; // this.modGain.gain.value; 0-1
		};

		return FmOscFacade;
	}
);