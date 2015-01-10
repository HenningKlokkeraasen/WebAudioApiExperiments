
/*


    Web Audio API - custom nodes - Tremolo
    

*/

TremoloFacade.prototype = Object.create(FacadeBase2.prototype);
TremoloFacade.prototype.constructor = TremoloFacade;

function TremoloFacade(audioContext) {
	FacadeBase2.call(this, audioContext); // base()

	return this;
}

// private
TremoloFacade.prototype.initNodes = function() {
	this.input = this.audioContext.createGain();
	this.output = this.input; // TODO verify
	this.lfoFacade = new LfoFacade(this.audioContext);


};

// private
TremoloFacade.prototype.setDefaultValues = function() {



};

// private
TremoloFacade.prototype.wireUp = function() {
	// let the gain AudioParam be controlled by an LFO
	var amplitude = this.input.gain;
	this.lfoFacade.control(amplitude);



};

TremoloFacade.prototype.setLfoRate = function(value) {
	this.lfoFacade.setFrequency(value);
	return this;
};

TremoloFacade.prototype.setLfoWaveType = function(type) {
	this.lfoFacade.setType(type);
	return this;
};
