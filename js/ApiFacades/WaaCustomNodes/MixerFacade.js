
/*


    Web Audio API - custom nodes - Mixer
    

*/

MixerFacade.prototype = Object.create(FacadeBase2.prototype);
MixerFacade.prototype.constructor = MixerFacade;

function MixerFacade(audioContext) {
    FacadeBase2.call(this, audioContext); // base()

    return this;
}

// private
MixerFacade.prototype.initNodes = function() {
    this.masterGain = this.audioContext.createGain();
    this.channelSplitter = this.audioContext.createChannelSplitter(2);
    this.channelMerger = this.audioContext.createChannelMerger(2);
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.input = this.masterGain;
    this.output = this.audioContext.createGain();
};

// private
MixerFacade.prototype.setDefaultValues = function() {

};

// private
MixerFacade.prototype.wireUp = function() {
    this.masterGain.connect(this.channelSplitter);
    this.channelSplitter.connect(this.leftGain, 0);
    this.channelSplitter.connect(this.rightGain, 0);
    this.leftGain.connect(this.channelMerger, 0, 0);
    this.rightGain.connect(this.channelMerger, 0, 1);
    this.channelMerger.connect(this.output);
};

MixerFacade.prototype.setGainLevel = function(value) {
    this.masterGain.gain.value = value;
    return this;
};

MixerFacade.prototype.setLeftLevel = function(value) {
    this.leftGain.gain.value = value;
    return this;
};

MixerFacade.prototype.setRightLevel = function(value) {
    this.rightGain.gain.value = value;
    return this;
};
