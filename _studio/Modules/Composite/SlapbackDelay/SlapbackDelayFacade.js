/*
    Web Audio API - custom nodes - Slapback Delay (Slapback Echo)
    From http://www.html5rocks.com/en/tutorials/casestudies/jamwithchrome-audio/
*/
define([
    '/_studio/Modules/_FacadeBase.js'
    ], function(FacadeBase) {
        SlapbackDelayFacade.prototype = Object.create(FacadeBase.prototype);
        SlapbackDelayFacade.prototype.constructor = SlapbackDelayFacade;

        function SlapbackDelayFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

            return this;
        }

        // private
        SlapbackDelayFacade.prototype.initNodes = function() {
            this.input = this.audioContext.createGain();
            this.output = this.audioContext.createGain();
            this.delay = this.audioContext.createDelay();
            this.feedback = this.audioContext.createGain();
            this.wetLevel = this.audioContext.createGain();
        };

        // private
        SlapbackDelayFacade.prototype.setDefaultValues = function() {
            this.delay.delayTime.value = 0.15; // 150 ms delay
            this.feedback.gain.value = 0.25;
            this.wetLevel.gain.value = 0.25;
        };

        // private
        SlapbackDelayFacade.prototype.wireUp = function() {
            this.input.connect(this.delay);
            this.input.connect(this.output);
            this.delay.connect(this.feedback);
            this.delay.connect(this.wetLevel);
            this.feedback.connect(this.delay);
            this.wetLevel.connect(this.output);
        };

        SlapbackDelayFacade.prototype.setWetLevel = function(value) {
            this.wetLevel.gain.value = value;
            return this;
        };

        SlapbackDelayFacade.prototype.setFeedback = function(value) {
            this.feedback.gain.value = value;
            return this;
        };

        SlapbackDelayFacade.prototype.setDelayTime = function(value) {
            this.delay.delayTime.value = value;
            return this;
        };

        return SlapbackDelayFacade;
    }
);