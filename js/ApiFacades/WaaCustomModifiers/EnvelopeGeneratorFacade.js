
/*


    Web Audio API - custom nodes - Envelope Generator
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html

*/

EnvelopeGeneratorFacade.prototype = Object.create(FacadeBase2.prototype);
EnvelopeGeneratorFacade.prototype.constructor = EnvelopeGeneratorFacade;

function EnvelopeGeneratorFacade(audioContext) {
    FacadeBase2.call(this, audioContext); // base()

    return this;
}

// private
EnvelopeGeneratorFacade.prototype.initNodes = function() {





};

// private
EnvelopeGeneratorFacade.prototype.setDefaultValues = function() {



};

// private
EnvelopeGeneratorFacade.prototype.wireUp = function() {






};

// connect to an audioParam (not an audioNode)
EnvelopeGeneratorFacade.prototype.control = function(audioParam) {
    this.audioParam = audioParam;
    return this;
};

EnvelopeGeneratorFacade.prototype.gateOn = function() {
    this.trigger();
    return this;
};

EnvelopeGeneratorFacade.prototype.gateOff = function() {
    this.release();
    return this;
};

EnvelopeGeneratorFacade.prototype.setAttackTime = function(value) {
    this.attackTime = parseFloat(value);
    return this;
};

EnvelopeGeneratorFacade.prototype.setDecayTime = function(value) {
    this.decayTime = parseFloat(value);
    return this;
};

EnvelopeGeneratorFacade.prototype.setSustainLevel = function(value) {
    this.sustainLevel = parseFloat(value);
    return this;
};

EnvelopeGeneratorFacade.prototype.setReleaseTime = function(value) {
    this.releaseTime = parseFloat(value);
    return this;
};

//
// private
//

EnvelopeGeneratorFacade.prototype.trigger = function() {
    var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue();

    // ATTACK
    this.audioParam.linearRampToValueAtTime(1.0, now + this.attackTime);
    ////this.audioParam.setTargetAtTime(1.0, now, this.attackTime);

    // DECAY to SUSTAIN LEVEL
    var sustainLevel = this.sustainLevel;
    if (this.sustainLevel == 0)
        sustainLevel = 0.0001;

    

    ////this.audioParam.exponentialRampToValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);
    ////this.audioParam.setTargetAtTime(sustainLevel, now + this.attackTime, this.decayTime);
    this.audioParam.linearRampToValueAtTime(sustainLevel, (now + this.attackTime + this.decayTime));
    ////this.audioParam.setValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);

    if (this.sustainLevel == 0)
        this.audioParam.setValueAtTime(0, now + this.attackTime + this.decayTime);

};

EnvelopeGeneratorFacade.prototype.release = function() {
    var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue();

    // RELEASE
    this.audioParam.setTargetAtTime(0.0, now, this.releaseTime);
    ////this.audioParam.linearRampToValueAtTime(0.0, now + this.releaseTime);
};

EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValuesAndSetValue = function() {
    var now = this.audioContext.currentTime;

    this.audioParam.cancelScheduledValues(now);
    
    // Anchor beginning of ramp at current value.
    this.audioParam.setValueAtTime(this.audioParam.value, now);

    return now;
};
