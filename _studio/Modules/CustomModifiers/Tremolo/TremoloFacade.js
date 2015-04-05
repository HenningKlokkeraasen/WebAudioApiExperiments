/*
    Web Audio API - custom nodes - Tremolo
*/
define([
    '/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/CustomGenerators/LFO/LfoFacade.js'
	], function(FacadeBase, LfoFacade) {
		TremoloFacade.prototype = Object.create(FacadeBase.prototype);
		TremoloFacade.prototype.constructor = TremoloFacade;

		function TremoloFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		TremoloFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createGain();
			this.amplitudeGain = this.audioContext.createGain();
			this.output = this.amplitudeGain; // TODO verify
			this.lfoFacade = new LfoFacade(this.audioContext);
			

		};

		// private
		TremoloFacade.prototype.setDefaultValues = function() {



		};

		// private
		TremoloFacade.prototype.wireUp = function() {
			this.input.connect(this.amplitudeGain);
			// let the gain AudioParam be controlled by an LFO
			var amplitude = this.amplitudeGain.gain;
			this.lfoFacade.control(amplitude);


		};

		TremoloFacade.prototype.setPreGain = function(value) {
			this.input.gain.value = value;
			return this;
		};

		TremoloFacade.prototype.setLfoRate = function(value) {
			this.lfoFacade.setRate(value);
			return this;
		};

        TremoloFacade.prototype.setLfoDepth = function(value) {
            this.lfoFacade.setDepth(value);
            return this;
        };

		TremoloFacade.prototype.setLfoWaveType = function(type) {
			this.lfoFacade.setType(type);
			return this;
		};

		return TremoloFacade;
	}
);