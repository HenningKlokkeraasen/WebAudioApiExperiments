/*
    Web Audio API - custom nodes - Master Section (of a mixer)
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js'
	], function(FacadeBase, GainFacade) {
		MasterSectionFacade.prototype = Object.create(FacadeBase.prototype);
		MasterSectionFacade.prototype.constructor = MasterSectionFacade;

		function MasterSectionFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		MasterSectionFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.audioContext.createGain();
		};

		// private
		MasterSectionFacade.prototype.setDefaultValues = function() {



		};

		// private
		MasterSectionFacade.prototype.wireUp = function() {
			this.input.connect(this.output);



		};

		MasterSectionFacade.prototype.setGain = function(value) {
			this.input.gain.value = value;
			return this;
		}

		return MasterSectionFacade;
	}
);
