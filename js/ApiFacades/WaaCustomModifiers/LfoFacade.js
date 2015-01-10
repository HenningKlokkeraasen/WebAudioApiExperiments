
/*


    Web Audio API - custom nodes - LFO (Low Frequency Oscillator)
    

*/

LfoFacade.prototype = Object.create(FacadeBase2.prototype);
LfoFacade.prototype.constructor = LfoFacade;

function LfoFacade(audioContext) {
    FacadeBase2.call(this, audioContext); // base()

    return this;
}

// private
LfoFacade.prototype.initNodes = function() {
    this.input = this.audioContext.createOscillator();
    this.output = this.input;



};

// private
LfoFacade.prototype.setDefaultValues = function() {
    this.input.start(0);
    this.setFrequency(10);

};

// private
LfoFacade.prototype.wireUp = function() {


    



};

// connect to an audioParam (not an audioNode)
LfoFacade.prototype.control = function(audioParam) {
    this.input.connect(audioParam);
    return this;
};

LfoFacade.prototype.setType = function(type) {
    this.input.type = type;
    return this;
};

LfoFacade.prototype.setFrequency = function(value) {
    if (value > this.max_frequency)
        value = this.max_frequency;
    this.input.frequency.value = value;
    return this;
};

LfoFacade.prototype.max_frequency = 20;
