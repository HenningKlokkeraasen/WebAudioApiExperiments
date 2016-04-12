/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
	'/_studio/Modules/_Mixins/ICanBeModulated.js'
	], function(FacadeBase, ICanBeTriggered, ICanBeModulated) {
		GainFacade.prototype = Object.create(FacadeBase.prototype);
		GainFacade.prototype.constructor = GainFacade;

		function GainFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
			ICanBeModulated.call(this);

			return this;
		}

		// Implementation of FacadeBase
		GainFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.audioContext.createGain();

		    // Implementation of ICanBeModulated
			this.modulateIn = this.input.gain;

			// Implementation of iCanBeTriggered
			this.triggerIn = this.input.gain;
			this.triggerInValue = this.triggerIn.value;
			this.triggerInMaxValue = 1;
			this.triggerInMinValue = 0;
		};

		GainFacade.prototype.setDefaultValues = function() {
		};

		GainFacade.prototype.wireUp = function() {
			this.input.connect(this.output);
		};
		// End Implementation of FacadeBase

		GainFacade.prototype.setGain = function(value) {
			this.input.gain.value = value;
			this.triggerInValue = value;
			this.triggerInMaxValue = value;
			return this;
		};

		return GainFacade;
	}
);