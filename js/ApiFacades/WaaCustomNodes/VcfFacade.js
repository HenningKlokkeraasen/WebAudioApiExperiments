
/*


    Web Audio API - custom nodes - VCF (Voltage Controlled Filter)
    

*/

VcfFacade.prototype = Object.create(FacadeBase2.prototype);
VcfFacade.prototype.constructor = VcfFacade;

function VcfFacade(audioContext) {
	FacadeBase2.call(this, audioContext); // base()

	return this;
}

// private
VcfFacade.prototype.initNodes = function() {
	this.filterFacade = new FilterFacade(this.audioContext);
	this.input = this.filterFacade.node;
	this.output = this.input; // TODO verify
	this.lfoFacade = new LfoFacade(this.audioContext);
	this.lfoGain = this.audioContext.createGain();
};

// private
VcfFacade.prototype.setDefaultValues = function() {
	this.setFilterGain(500);

	//this.filter.setFrequencyByScale(0.75);
};

// private
VcfFacade.prototype.wireUp = function() {
    // let the cutoff frequency AudioParam be controlled by an LFO
    // Use a gain to increase intensity(?)
	this.lfoFacade.node.connect(this.lfoGain);
	var freq = this.filterFacade.node.frequency;
	this.lfoGain.connect(freq);

};

VcfFacade.prototype.setLfoRate = function(value) {
	this.lfoFacade.setFrequency(value);
	return this;
};

VcfFacade.prototype.setLfoWaveType = function(type) {
	this.lfoFacade.setType(type);
	return this;
};

VcfFacade.prototype.setLfoGain = function(value) {
	this.lfoGain.gain.value = value;
	return this;
};

VcfFacade.prototype.setFilterType = function(type) {
	this.filterFacade.setType(type);
	return this;
};

VcfFacade.prototype.setFrequencyByScale = function(scalerValue) {
	this.filterFacade.setFrequencyByScale(scalerValue);
};

VcfFacade.prototype.setFilterQuality = function(value) {
	this.filterFacade.setQuality(value);
	return this;
};

VcfFacade.prototype.setFilterGain = function(value) {
	this.filterFacade.setGain(value);
	return this;
};

//VcfFacade.prototype.setFrequencyByAbsoluteValue = function(value) {
	//this.filterFacade.setFrequencyByAbsoluteValue(value);
//	return this;
//};

//VcfFacade.prototype.setFrequencyByScale = function(scalerValue) {
	//this.filterFacade.setFrequencyByScale(scalerValue);
//	return this;
//};
