/*
    Web Audio API - custom nodes - Mixer channel strip
*/
define([
    '/_studio/Modules/_FacadeBase.js'
    ], function(FacadeBase) {
        ChannelStripFacade.prototype = Object.create(FacadeBase.prototype);
        ChannelStripFacade.prototype.constructor = ChannelStripFacade;

        function ChannelStripFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

            return this;
        }

        // private
        ChannelStripFacade.prototype.initNodes = function() {
            this.masterGain = this.audioContext.createGain();
            this.channelSplitter = this.audioContext.createChannelSplitter(2);
            this.channelMerger = this.audioContext.createChannelMerger(2);
            this.leftGain = this.audioContext.createGain();
            this.rightGain = this.audioContext.createGain();
            this.input = this.masterGain;
            this.output = this.audioContext.createGain();
        };

        // private
        ChannelStripFacade.prototype.setDefaultValues = function() {

        };

        // private
        ChannelStripFacade.prototype.wireUp = function() {
            this.masterGain.connect(this.channelSplitter);
            this.channelSplitter.connect(this.leftGain, 0);
            this.channelSplitter.connect(this.rightGain, 0);
            this.leftGain.connect(this.channelMerger, 0, 0);
            this.rightGain.connect(this.channelMerger, 0, 1);
            this.channelMerger.connect(this.output);
        };

        ChannelStripFacade.prototype.setGainLevel = function(value) {
            this.masterGain.gain.value = value;
            return this;
        };

        ChannelStripFacade.prototype.setLeftLevel = function(value) {
            this.leftGain.gain.value = value;
            return this;
        };

        ChannelStripFacade.prototype.setRightLevel = function(value) {
            this.rightGain.gain.value = value;
            return this;
        };

        return ChannelStripFacade;
    }
);