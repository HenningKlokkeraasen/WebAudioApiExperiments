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
		    this.output = this.input; // TODO verify



		};

		// private
		GainFacade.prototype.setDefaultValues = function() {



		};

		// private
		GainFacade.prototype.wireUp = function() {






		};

		GainFacade.prototype.setGain = function(value) {
			this.input.gain.value = value;
			return this;
		}

		return GainFacade;
	}
);