/*
	Web Audio API wrapper - Dynamics Compressor
*/
define([
	'/_WebAudioApiFacades/_FacadeBase2.js'
	], function(FacadeBase2) {
		CompressorFacade.prototype = Object.create(FacadeBase2.prototype);
		CompressorFacade.prototype.constructor = CompressorFacade;

		function CompressorFacade(audioContext) {
			FacadeBase2.call(this, audioContext); // base()

			return this;
		}

		// private
		CompressorFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createDynamicsCompressor();
			this.output = this.input; // TODO verify



		};

		// private
		CompressorFacade.prototype.setDefaultValues = function() {



		};

		// private
		CompressorFacade.prototype.wireUp = function() {






		};

		CompressorFacade.prototype.setThreshold = function(value) {
			this.node.threshold.value = value;
			return this;
		}

		CompressorFacade.prototype.setKnee = function(value) {
			this.node.knee.value = value;
			return this;
		}

		CompressorFacade.prototype.setRatio = function(value) {
			this.node.ratio.value = value;
			return this;
		}

		CompressorFacade.prototype.setReduction = function(value) {
			this.node.reduction.value = value;
			return this;
		}

		CompressorFacade.prototype.setAttack = function(value) {
			this.node.attack.value = value;
			return this;
		}

		CompressorFacade.prototype.setRelease = function(value) {
			this.node.release.value = value;
			return this;
		}

		return CompressorFacade;
	}
);