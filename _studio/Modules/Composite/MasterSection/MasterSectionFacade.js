/*
    Web Audio API - custom nodes - Master Section (of a mixer)
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js',
    '/_studio/Modules/BasicWaa/Compressor/CompressorFacade.js'
	], function(FacadeBase, GainFacade, CompressorFacade) {
		MasterSectionFacade.prototype = Object.create(FacadeBase.prototype);
		MasterSectionFacade.prototype.constructor = MasterSectionFacade;

		function MasterSectionFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		MasterSectionFacade.prototype.initNodes = function() {
			this.gainFacade = new GainFacade(this.audioContext);
			this.compressorFacade = new CompressorFacade(this.audioContext);

			this.input = this.gainFacade.input;
			this.output = this.compressorFacade; // an output that can be sent to e.g. an Analyser
		};

		// private
		MasterSectionFacade.prototype.setDefaultValues = function() {



		};

		// private
		MasterSectionFacade.prototype.wireUp = function() {
			this.gainFacade.connectOrDisconnect(this.compressorFacade.input);
			this.compressorFacade.connectOrDisconnect(this.audioContext.destination);




		};

		MasterSectionFacade.prototype.setGain = function(value) {
			this.gainFacade.setGain(value);
			return this;
		}

		MasterSectionFacade.prototype.setThreshold = function(value) {
			this.compressorFacade.setThreshold(value);
			return this;
		}

		MasterSectionFacade.prototype.setKnee = function(value) {
			this.compressorFacade.setKnee(value);
			return this;
		}

		MasterSectionFacade.prototype.setRatio = function(value) {
			this.compressorFacade.setRatio(value);
			return this;
		}

		MasterSectionFacade.prototype.setReduction = function(value) {
			this.compressorFacade.setReduction(value);
			return this;
		}

		MasterSectionFacade.prototype.setAttack = function(value) {
			this.compressorFacade.setAttack(value);
			return this;
		}

		MasterSectionFacade.prototype.setRelease = function(value) {
			this.compressorFacade.setRelease(value);
			return this;
		}

		return MasterSectionFacade;
	}
);
