/*
    Web Audio API - custom nodes - Envelope Generator
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html
*/
define([
    '/_studio/Modules/_FacadeBase.js'
    ], function(FacadeBase) {
        EnvelopeGeneratorFacade.prototype = Object.create(FacadeBase.prototype);
        EnvelopeGeneratorFacade.prototype.constructor = EnvelopeGeneratorFacade;

        function EnvelopeGeneratorFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

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

        // connect to an audioParam (not an audioNode) moved to base note renamed to setTriggerFor
        // EnvelopeGeneratorFacade.prototype.control = function(audioParam) {
        //     this.audioParam = audioParam;
        //     return this;
        // };

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

        // TODO Support more than going from 0-1. now it will only work for gains

        EnvelopeGeneratorFacade.prototype.trigger = function() {
            var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue();

            // ATTACK
            this.triggerOut.linearRampToValueAtTime(1.0, now + this.attackTime);
            ////this.triggerOut.setTargetAtTime(1.0, now, this.attackTime);

            // DECAY to SUSTAIN LEVEL
            var sustainLevel = this.sustainLevel;
            if (this.sustainLevel == 0)
                sustainLevel = 0.0001;

            

            ////this.triggerOut.exponentialRampToValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);
            ////this.triggerOut.setTargetAtTime(sustainLevel, now + this.attackTime, this.decayTime);
            this.triggerOut.linearRampToValueAtTime(sustainLevel, (now + this.attackTime + this.decayTime));
            ////this.triggerOut.setValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);

            if (this.sustainLevel == 0)
                this.triggerOut.setValueAtTime(0, now + this.attackTime + this.decayTime);

        };

        EnvelopeGeneratorFacade.prototype.release = function() {
            var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue();

            // RELEASE
            this.triggerOut.setTargetAtTime(0.0, now, this.releaseTime);
            ////this.triggerOut.linearRampToValueAtTime(0.0, now + this.releaseTime);
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValuesAndSetValue = function() {
            var now = this.audioContext.currentTime;

            this.triggerOut.cancelScheduledValues(now);
            
            // Anchor beginning of ramp at current value.
            this.triggerOut.setValueAtTime(this.triggerOut.value, now);

            return now;
        };

        return EnvelopeGeneratorFacade;
    }
);
