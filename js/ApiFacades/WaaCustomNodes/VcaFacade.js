
/*


    Web Audio API - custom nodes - VCA (Voltage Controlled Amplifier)
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html

*/

VcaFacade.prototype = Object.create(FacadeBase2.prototype);
VcaFacade.prototype.constructor = VcaFacade;

function VcaFacade(audioContext) {
    FacadeBase2.call(this, audioContext); // base()

    return this;
}

// private
VcaFacade.prototype.initNodes = function() {
    this.input = this.audioContext.createGain();
    this.output = this.input;
    this.envelope = new EnvelopeGeneratorFacade(this.audioContext);


};

// private
VcaFacade.prototype.setDefaultValues = function() {
    // start with no gain (mute)
    this.input.gain.value = 0;

};

// private
VcaFacade.prototype.wireUp = function() {
    // let the gain AudioParam be controlled by an envelope generator
    var amplitude = this.input.gain;
    this.envelope.control(amplitude);



};

VcaFacade.prototype.gateOn = function() {
    this.envelope.gateOn();
    return this;
}

VcaFacade.prototype.gateOff = function() {
    this.envelope.gateOff();
    return this;
};

VcaFacade.prototype.setAttackTime = function(value) {
    this.envelope.setAttackTime(value);
    return this;
};

VcaFacade.prototype.setDecayTime = function(value) {
    this.envelope.setDecayTime(value);
    return this;
};

VcaFacade.prototype.setSustainLevel = function(value) {
    this.envelope.setSustainLevel(value);
    return this;
};

VcaFacade.prototype.setReleaseTime = function(value) {
    this.envelope.setReleaseTime(value);
    return this;
};
