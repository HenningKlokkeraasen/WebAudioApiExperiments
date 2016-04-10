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

		// private
		GainFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.audioContext.createGain();
			this.modulateIn = this.input.gain; // ICanBeModulated
			this.triggerIn = this.input.gain; // ICanBeTriggered
		};

		// private
		GainFacade.prototype.setDefaultValues = function() {
		};

		// private
		GainFacade.prototype.wireUp = function() {
			this.input.connect(this.output);
		};

		GainFacade.prototype.setGain = function(value) {
			this.input.gain.value = value;
			// this.output.gain.value = value;
			return this;
		};

		return GainFacade;
	}
);