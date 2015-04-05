/*
	Web Audio API wrapper - Delay
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		DelayFacade.prototype = Object.create(FacadeBase.prototype);
		DelayFacade.prototype.constructor = DelayFacade;

		function DelayFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()

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