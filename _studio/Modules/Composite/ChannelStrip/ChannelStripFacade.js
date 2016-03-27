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
            this.panNode = this.audioContext.createStereoPanner();
            this.input = this.masterGain;
            this.output = this.audioContext.createGain();
        };

        // private
        ChannelStripFacade.prototype.setDefaultValues = function() {

        };

        // private
        ChannelStripFacade.prototype.wireUp = function() {
            this.masterGain.connect(this.panNode);
            this.panNode.connect(this.output);
        };

        ChannelStripFacade.prototype.setGainLevel = function(value) {
            this.masterGain.gain.value = value;
            return this;
        };

        ChannelStripFacade.prototype.setLeftRightPanLevel = function(value) {
			this.panNode.pan.value = value;
            return this;
        };

        return ChannelStripFacade;
    }
);