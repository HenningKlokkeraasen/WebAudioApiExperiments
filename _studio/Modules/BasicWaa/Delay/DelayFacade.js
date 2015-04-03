/*
	Web Audio API wrapper - Delay
*/
define([
	'/_WebAudioApiFacades/_FacadeBase2.js'
	], function(FacadeBase2) {
		DelayFacade.prototype = Object.create(FacadeBase2.prototype);
		DelayFacade.prototype.constructor = DelayFacade;

		function DelayFacade(audioContext) {
		    FacadeBase2.call(this, audioContext); // base()

			return this;
		}

		// private
		DelayFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createDelay();
		    this.output = this.input; // TODO verify



		};

		// private
		DelayFacade.prototype.setDefaultValues = function() {



		};

		// private
		DelayFacade.prototype.wireUp = function() {






		};

		DelayFacade.prototype.setDelayTime = function(value) {
			this.node.delayTime.value = value;
			return this;
		}

		return DelayFacade;
	}
);