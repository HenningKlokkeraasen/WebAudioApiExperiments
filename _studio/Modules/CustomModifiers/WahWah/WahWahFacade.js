/*
    Web Audio API - custom nodes - wah-wah (filter sweep)
*/
define([
    '/_WebAudioApiFacades/_FacadeBase2.js',
    '/_studio/Modules/BasicWaa/Filter/FilterFacade.js',
    '/_studio/Modules/CustomGenerators/LFO/LfoFacade.js'
	], function(FacadeBase2, FilterFacade, LfoFacade) {
		WahWahFacade.prototype = Object.create(FacadeBase2.prototype);
		WahWahFacade.prototype.constructor = WahWahFacade;

		function WahWahFacade(audioContext) {
			FacadeBase2.call(this, audioContext); // base()

			return this;
		}

		// private
		WahWahFacade.prototype.initNodes = function() {
			this.input = this.audioContext.createGain();
			this.filterFacade = new FilterFacade(this.audioContext);
			// this.input = this.filterFacade.node;
			this.output = this.filterFacade.node; // TODO verify
			this.lfoFacade = new LfoFacade(this.audioContext);
			this.lfoGain = this.audioContext.createGain();
		};

		// private
		WahWahFacade.prototype.setDefaultValues = function() {
			this.setFilterGain(500);
			//this.filter.setFrequencyByScale(0.75);
		};

		// private
		WahWahFacade.prototype.wireUp = function() {
			this.input.connect(this.output);
		    // let the cutoff frequency AudioParam be controlled by an LFO
		    // Use a gain to increase intensity/amount
			this.lfoFacade.node.connect(this.lfoGain);
			var freq = this.filterFacade.node.frequency;
			this.lfoGain.connect(freq);
		};

		WahWahFacade.prototype.setPreGain = function(value) {
			this.input.gain.value = value;
			return this;
		};

		WahWahFacade.prototype.setLfoRate = function(value) {
			this.lfoFacade.setRate(value);
			return this;
		};

		WahWahFacade.prototype.setLfoWaveType = function(type) {
			this.lfoFacade.setType(type);
			return this;
		};

		WahWahFacade.prototype.setLfoGain = function(value) {
			this.lfoGain.gain.value = value;
			return this;
		};

		WahWahFacade.prototype.setFilterType = function(type) {
			this.filterFacade.setType(type);
			return this;
		};

		WahWahFacade.prototype.setFrequencyByScale = function(scalerValue) {
			this.filterFacade.setFrequencyByScale(scalerValue);
		};

		WahWahFacade.prototype.setFilterQuality = function(value) {
			this.filterFacade.setQuality(value);
			return this;
		};

		WahWahFacade.prototype.setFilterGain = function(value) {
			this.filterFacade.setGain(value);
			return this;
		};

		//WahWahFacade.prototype.setFrequencyByAbsoluteValue = function(value) {
			//this.filterFacade.setFrequencyByAbsoluteValue(value);
		//	return this;
		//};

		//WahWahFacade.prototype.setFrequencyByScale = function(scalerValue) {
			//this.filterFacade.setFrequencyByScale(scalerValue);
		//	return this;
		//};

		return WahWahFacade;
	}
);