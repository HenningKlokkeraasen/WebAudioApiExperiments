/*
	Web Audio API wrapper - AudioDestination
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		AudioDestinationFacade.prototype = Object.create(FacadeBase.prototype);
		AudioDestinationFacade.prototype.constructor = AudioDestinationFacade;

		function AudioDestinationFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		AudioDestinationFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.destination;
		    this.output = this.input; // TODO verify



		};

		// private
		AudioDestinationFacade.prototype.setDefaultValues = function() {



		};

		// private
		AudioDestinationFacade.prototype.wireUp = function() {






		};

		return AudioDestinationFacade;
	}
);