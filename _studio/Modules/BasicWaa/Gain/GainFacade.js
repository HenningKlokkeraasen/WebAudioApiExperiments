/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		GainFacade.prototype = Object.create(FacadeBase.prototype);
		GainFacade.prototype.constructor = GainFacade;

		function GainFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		GainFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.audioContext.createGain();
			this.controlIn = this.input.gain;
			this.triggerIn = this.output.gain;// a separate node needed to both control and trigger at the same time

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
			this.output.gain.value = value;
			return this;
		}

		return GainFacade;
	}
);