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

        ChannelStripFacade.prototype.setLeftRightPanLevel = function(value) {
			if (value < 0) {
            	this.leftGain.gain.value = (1 + Math.abs(value)) / 2;
            	this.rightGain.gain.value = (1 - Math.abs(value)) / 2;
			}
			else {
            	this.leftGain.gain.value = (1 - value) / 2;
            	this.rightGain.gain.value = (1 + value) / 2;
			}
            return this;
        };

        return ChannelStripFacade;
    }
);