/*
	Web Audio API wrapper - Oscillator
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/BasicWaa/Gain/GainFacade.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
	'/_studio/Modules/_Mixins/ICanBeAudioParamControlled.js'
	], function(FacadeBase, GainFacade, ICanBeTriggered, ICanBeAudioParamControlled) {
		OscillatorFacade.prototype = Object.create(FacadeBase.prototype); // new FacadeBase2();
		OscillatorFacade.prototype.constructor = OscillatorFacade;

		function OscillatorFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
			ICanBeAudioParamControlled.call(this);
			
			return this;
		};

		// private
		OscillatorFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createOscillator();
			// create a gain node as the output
			// this will be what is used for connections
			this.output = new GainFacade(this.audioContext);
			this.controlIn = this.input.frequency;
			// this.controlOut = this.output.output;
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
		
		//region iCanBeTriggered
		OscillatorFacade.prototype.gateOn = function(callback, originator) {
			// set the value of the frequency AudioParam down,
			// it will be picked up in the EG,
			// set the ramp up to value higher than the original frequency,
			// use the sustainLevelOverride param to the EG to go back down 
			// to the original frequency
			var originalValue = this.input.frequency.value;
			this.input.frequency.value = originalValue / 2; //TODO verify
			var rampUpToValue = originalValue * 2; // TODO verify
			callback.call(originator, this.input.frequency, rampUpToValue, 20, originalValue);
		};

		OscillatorFacade.prototype.gateOff = function(callback, originator) {
			// callback.call(originator, this.input.frequency, 40);
		};
		//endregion iCanBeTriggered

		return OscillatorFacade;
	}
);