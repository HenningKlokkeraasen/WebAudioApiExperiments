
/*


	Web Audio API wrapper - Gain


*/

GainFacade.prototype = Object.create(FacadeBase2.prototype);
GainFacade.prototype.constructor = GainFacade;

function GainFacade(audioContext) {
    FacadeBase2.call(this, audioContext); // base()

	return this;
}

// private
GainFacade.prototype.initNodes = function() {
    this.input = this.audioContext.createGain();
    this.output = this.input; // TODO verify



};

// private
GainFacade.prototype.setDefaultValues = function() {



};

// private
GainFacade.prototype.wireUp = function() {






};

GainFacade.prototype.setGain = function(value) {
	this.input.gain.value = value;
	return this;
}
