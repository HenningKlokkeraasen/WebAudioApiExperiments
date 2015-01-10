
/*


    Web Audio API - custom nodes - Sluttrinne
    

*/

SluttrinnFacade.prototype = Object.create(FacadeBase2.prototype);
SluttrinnFacade.prototype.constructor = SluttrinnFacade;

function SluttrinnFacade(audioContext) {
	FacadeBase2.call(this, audioContext); // base()

	return this;
}

// private
SluttrinnFacade.prototype.initNodes = function() {
	this.gainFacade = new GainFacade(this.audioContext);
	this.compressorFacade = new CompressorFacade(this.audioContext);

	this.input = this.gainFacade.input;
	this.output = this.compressorFacade; // an output that can be sent to e.g. an Analyser
};

// private
SluttrinnFacade.prototype.setDefaultValues = function() {



};

// private
SluttrinnFacade.prototype.wireUp = function() {
	this.gainFacade.connect(this.compressorFacade.input);
	this.compressorFacade.connect(this.audioContext.destination);




};

SluttrinnFacade.prototype.setGain = function(value) {
	this.gainFacade.setGain(value);
	return this;
}

SluttrinnFacade.prototype.setThreshold = function(value) {
	this.compressorFacade.setThreshold(value);
	return this;
}

SluttrinnFacade.prototype.setKnee = function(value) {
	this.compressorFacade.setKnee(value);
	return this;
}

SluttrinnFacade.prototype.setRatio = function(value) {
	this.compressorFacade.setRatio(value);
	return this;
}

SluttrinnFacade.prototype.setReduction = function(value) {
	this.compressorFacade.setReduction(value);
	return this;
}

SluttrinnFacade.prototype.setAttack = function(value) {
	this.compressorFacade.setAttack(value);
	return this;
}

SluttrinnFacade.prototype.setRelease = function(value) {
	this.compressorFacade.setRelease(value);
	return this;
}
