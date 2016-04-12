/*
	Web Audio API wrapper - Oscillator
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/BasicWaa/Gain/GainFacade.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
    // '/_studio/Modules/_Mixins/ICanControlAudioParam.js',
	'/_studio/Modules/_Mixins/ICanBeModulated.js',
	'/_studio/Modules/_Mixins/ICanBeFrequencySet.js'
	], function(FacadeBase, GainFacade, ICanBeTriggered, 
		// ICanControlAudioParam, 
		ICanBeModulated, ICanBeFrequencySet) {
		OscillatorFacade.prototype = Object.create(FacadeBase.prototype); // new FacadeBase2();
		OscillatorFacade.prototype.constructor = OscillatorFacade;

		function OscillatorFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
            // ICanControlAudioParam.call(this);
			ICanBeModulated.call(this);
			ICanBeFrequencySet.call(this);
			
			return this;
		};

		// Implementation of FacadeBase
		OscillatorFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createOscillator();
			// create a gain node as the output
			// this will be what is used for connections
			this.output = this.audioContext.createGain();
			// this.controlOut = this.output;

		    // Implementation of ICanBeModulated
			this.modulateIn = this.input.frequency;

			// Implementation of ICanBeFrequencySet
			this.frequencyIn = this.input.frequency;

			// Implementation of iCanBeTriggered
			this.triggerIn = this.input.frequency;
			var tvelfthRootOfTwo = 1.0594630;
			var numberOfSemitonesToRamp = 1;
			this.depthPercentage = tvelfthRootOfTwo * numberOfSemitonesToRamp; // set to positive for attack rise, negative for attack fall
			this.setEnvelopeValues(this.triggerIn.value);
		};

		OscillatorFacade.prototype.setDefaultValues = function() {
			//this.input.start(0);
			this.output.gain.value = 0;
			this.hasBeenStartedOnce = false;
			this.isOn = false;
		};

		OscillatorFacade.prototype.wireUp = function() {
			this.input.connect(this.output);
		};
		// Implementation of FacadeBase

		OscillatorFacade.prototype.setType = function(type) {
			this.input.type = type;
			return this;
		};
		
		OscillatorFacade.prototype.setTypeByNumber = function(type) {
			switch (parseInt(type)) {
				case 0:
					this.input.type = 'sine';
					break;
				case 1:
					this.input.type = 'triangle';
					break;
				case 2:
					this.input.type = 'sawtooth';
					break;
				case 3:
					this.input.type = 'square';
					break;
				default:
					this.input.type = 'sine';
					break;
			}
			return this;
		};

		OscillatorFacade.prototype.setFrequency = function(frequency) {
			this.input.frequency.value = parseFloat(frequency);
			this.setEnvelopeValues(this.input.frequency.value);
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

		OscillatorFacade.prototype.toggleStartStop = function() {
			if (this.isOn)
				this.stop();
			else
				this.start();
		}

		OscillatorFacade.prototype.start = function() {
			this.isOn = true;
			if (!this.hasBeenStartedOnce)
			{
				this.input.start(0);
				this.hasBeenStartedOnce = true;
			}
			this.output.gain.value = 1;
			return this;
		};

		OscillatorFacade.prototype.stop = function() {
			this.isOn = false;
			//this.node.stop();

			// When an oscillator has stopped, it can not be started again. Create a new one ready to go.
			//this.node = this.audioContext.createOscillator();
			
			this.output.gain.value = 0;

			// create a gain node as the output
			// this will be what is used for connections
			//this.node.connect(this.gain.node);

			return this;
		};
		
		OscillatorFacade.prototype.setEnvelopeValues = function(frequency) {
			depth = frequency + this.depthPercentage;
			this.triggerInValue = frequency; // has no effect - pitch envelope will have S = 1 i.e. the current pitch.
			this.triggerInMaxValue = frequency + depth; // Attack to this
			this.triggerInMinValue = frequency; // Release to the frequency (pitch) - has no effect
		};

		return OscillatorFacade;
	}
);