/*
	Web Audio API wrapper - filter
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
	'/_studio/Modules/_Mixins/ICanBeModulated.js'
	], function(FacadeBase, ICanBeTriggered, ICanBeModulated) {
		FilterFacade.prototype = Object.create(FacadeBase.prototype); //new FacadeBase();
		FilterFacade.prototype.constructor = FilterFacade;

		function FilterFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
			ICanBeModulated.call(this);
			
			return this;
		}

		// Implementation of FacadeBase
		FilterFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createBiquadFilter();
		    this.output = this.input;

		    // Implementation of ICanBeModulated
			this.modulateIn = this.input.frequency;

			// Implementation of iCanBeTriggered
			this.triggerIn = this.input.frequency;
			this.depthPercentage = -0.4; // set to positive for attack rise, negative for attack fall
			this.setEnvelopeValues(this.triggerIn.value);
		};

		FilterFacade.prototype.setDefaultValues = function() {
		};

		FilterFacade.prototype.wireUp = function() {
		};
		// End Implementation of FacadeBase

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
			this.setEnvelopeValues(freq);
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

		FilterFacade.prototype.setEnvelopeValues = function(cutoffFrequency) {
			var depth = cutoffFrequency * this.depthPercentage;
			this.triggerInValue = cutoffFrequency + depth; // sustainToCalculatePercentageOf.
			this.triggerInMaxValue = cutoffFrequency + depth; // Attack to this
			this.triggerInMinValue = cutoffFrequency; // Release to the cutoff frequency
		};

		return FilterFacade;
	}
);