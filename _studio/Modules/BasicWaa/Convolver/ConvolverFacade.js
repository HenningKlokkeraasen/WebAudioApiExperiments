/*
	Web Audio API wrapper - Convolver
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		ConvolverFacade.prototype = Object.create(FacadeBase.prototype); //new FacadeBase();
		ConvolverFacade.prototype.constructor = ConvolverFacade;

		function ConvolverFacade(audioContext, buffers) {
			FacadeBase.call(this, audioContext); // base()
			this.buffers = buffers;
			return this;
		}

		// private
		ConvolverFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createConvolver();
		    this.output = this.input; // TODO verify



		};

		// private
		ConvolverFacade.prototype.setDefaultValues = function() {



		};

		// private
		ConvolverFacade.prototype.wireUp = function() {






		};

		ConvolverFacade.prototype.setImpulse = function(bufferIndex) {
			// Set the impulse response buffer
			var impulseBuffer = this.buffers[bufferIndex];
			this.node.buffer = impulseBuffer;
			return this;
		};

		return ConvolverFacade;
	}
);