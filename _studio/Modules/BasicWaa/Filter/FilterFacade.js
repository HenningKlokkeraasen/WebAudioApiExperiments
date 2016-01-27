/*
	Web Audio API wrapper - filter
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
	'/_studio/Modules/_Mixins/ICanBeAudioParamControlled.js'
	], function(FacadeBase, ICanBeTriggered, ICanBeAudioParamControlled) {
		FilterFacade.prototype = Object.create(FacadeBase.prototype); //new FacadeBase();
		FilterFacade.prototype.constructor = FilterFacade;

		function FilterFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
			ICanBeAudioParamControlled.call(this);
			
			return this;
		}

		// private
		FilterFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createBiquadFilter();
		    this.output = this.input; // TODO verify
			this.controlIn = this.input.frequency;

		};

		// private
		FilterFacade.prototype.setDefaultValues = function() {



		};

		// private
		FilterFacade.prototype.wireUp = function() {






		};

		FilterFacade.prototype.qualityMultiplier = 30; // todo parameterize

		FilterFacade.prototype.setType = function(type) {
			this.input.type = type;
			return this;
		};

		FilterFacade.prototype.setFrequencyByAbsoluteValue = function(value) {
			this.input.frequency.value = value;
			return this;
		};

		FilterFacade.prototype.setFrequencyByScale = function(scalerValue) {
			//console.log("filter of type " +
			//	this.node.type +
			//	" will change frequency scaler to " +
			//	value)

			// Clamp the frequency between the minimum value (40 Hz) and half of the
			// sampling rate.
			var minValue = 40;
			var maxValue = this.audioContext.sampleRate / 2;

			// Logarithm (base 2) to compute how many octaves fall in the range
			var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;

			// Compute a multiplier from 0 to 1 based on an exponential scale
			var multiplier = Math.pow(2, numberOfOctaves * (scalerValue - 1.0));

			// Get back to the frequency value between min and max
			var freq = maxValue * multiplier;
			//console.log("Filter: scaler " + scalerValue + ", gives frequency " + freq);
			this.input.frequency.value = freq;
			return this;
		};

		FilterFacade.prototype.setQuality = function(value) {
			//console.log("filter of type " +
			//	this.node.type +
			//	" will change quality scaler to " +
			//	value)
			this.input.Q.value = value * this.qualityMultiplier;
			return this;
		};

		FilterFacade.prototype.setGain = function(value) {
			this.input.gain.value = value;
			return this;
		};

		//region iCanBeTriggered
		FilterFacade.prototype.gateOn = function(callback, originator) {
			callback.call(originator, this.input.frequency, this.input.frequency.value, 40);
		};

		FilterFacade.prototype.gateOff = function(callback, originator) {
			callback.call(originator, this.input.frequency, 40);
		};
		//endregion iCanBeTriggered

		return FilterFacade;
	}
);