
/*


	Web Audio API wrapper - VCO


*/

VcoFacade.prototype = Object.create(FacadeBase2.prototype);
VcoFacade.prototype.constructor = VcoFacade;

function VcoFacade(audioContext) {
	FacadeBase2.call(this, audioContext); // base()

	return this;
};

// private
VcoFacade.prototype.initNodes = function() {
	this.input = this.audioContext.createOscillator();
    this.output = this.input;



};

// private
VcoFacade.prototype.setDefaultValues = function() {
	// Always on
	this.input.start(0);
	
};

// private
VcoFacade.prototype.wireUp = function() {






};

VcoFacade.prototype.setType = function(type) {
	this.input.type = type;
	return this;
};

VcoFacade.prototype.setFrequency = function(frequency) {
	this.input.frequency.value = frequency;
	return this;
};

VcoFacade.prototype.setDetune = function(semitone) {
	this.input.detune.value = semitone * 100;
	return this;
};

VcoFacade.prototype.pitchBendIsh = function(detuneValue) {
	this.input.detune.value = this.node.detune.value + detuneValue*10;
	return this;
};
