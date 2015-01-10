
/*


    Web Audio API - custom nodes - Filter Sweep
    

*/

FilterSweepFacade.prototype = Object.create(FacadeBase2.prototype);
FilterSweepFacade.prototype.constructor = FilterSweepFacade;

function FilterSweepFacade(audioContext) {
	FacadeBase2.call(this, audioContext); // base()

	return this;
}

// private
FilterSweepFacade.prototype.initNodes = function() {
	this.filterFacade = new FilterFacade(this.audioContext);
	this.input = this.filterFacade.node;
	this.output = this.input; // TODO verify
	this.lfoFacade = new LfoFacade(this.audioContext);
	this.lfoGain = this.audioContext.createGain();
};

// private
FilterSweepFacade.prototype.setDefaultValues = function() {
	this.setFilterGain(500);

	//this.filter.setFrequencyByScale(0.75);
};

// private
FilterSweepFacade.prototype.wireUp = function() {
    // let the cutoff frequency AudioParam be controlled by an LFO
    // Use a gain to increase intensity(?)
	this.lfoFacade.node.connect(this.lfoGain);
	var freq = this.filterFacade.node.frequency;
	this.lfoGain.connect(freq);

};

FilterSweepFacade.prototype.setLfoRate = function(value) {
	this.lfoFacade.setFrequency(value);
	return this;
};

FilterSweepFacade.prototype.setLfoWaveType = function(type) {
	this.lfoFacade.setType(type);
	return this;
};

FilterSweepFacade.prototype.setLfoGain = function(value) {
	this.lfoGain.gain.value = value;
	return this;
};

FilterSweepFacade.prototype.setFilterType = function(type) {
	this.filterFacade.setType(type);
	return this;
};

FilterSweepFacade.prototype.setFrequencyByScale = function(scalerValue) {
	this.filterFacade.setFrequencyByScale(scalerValue);
};

FilterSweepFacade.prototype.setFilterQuality = function(value) {
	this.filterFacade.setQuality(value);
	return this;
};

FilterSweepFacade.prototype.setFilterGain = function(value) {
	this.filterFacade.setGain(value);
	return this;
};

//FilterSweepFacade.prototype.setFrequencyByAbsoluteValue = function(value) {
	//this.filterFacade.setFrequencyByAbsoluteValue(value);
//	return this;
//};

//FilterSweepFacade.prototype.setFrequencyByScale = function(scalerValue) {
	//this.filterFacade.setFrequencyByScale(scalerValue);
//	return this;
//};
