/*
    Web Audio API - custom nodes - Envelope Generator
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html
*/
define([
    '/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/_Mixins/ICanTrigger.js',
    '/_studio/Modules/_Mixins/ICanBeTriggered.js'
    ], function(FacadeBase, ICanTrigger, ICanBeTriggered) {
        EnvelopeGeneratorFacade.prototype = Object.create(FacadeBase.prototype);
        EnvelopeGeneratorFacade.prototype.constructor = EnvelopeGeneratorFacade;

        function EnvelopeGeneratorFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()
            ICanTrigger.call(this);
            ICanBeTriggered.call(this);

            this.gateOnCallback = this.initiateTriggering;
            this.gateOffCallback = this.initiateReleasing;

            return this;
        }

        // private
        EnvelopeGeneratorFacade.prototype.initNodes = function() {
            this.controlIn = this.audioContext.createGain();




        };

        // private
        EnvelopeGeneratorFacade.prototype.setDefaultValues = function() {
            this.controlIn.gain.value = 0;


        };

        // private
        EnvelopeGeneratorFacade.prototype.wireUp = function() {






        };

        // connect to an audioParam (not an audioNode) moved to base note renamed to setTriggerFor
        // EnvelopeGeneratorFacade.prototype.control = function(audioParam) {
        //     this.audioParam = audioParam;
        //     return this;
        // };

        EnvelopeGeneratorFacade.prototype.initGateOn = function() {
            this.trigger();
        };

        EnvelopeGeneratorFacade.prototype.initGateOff = function() {
            this.release();
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

        EnvelopeGeneratorFacade.prototype.initiateTriggering = function(audioParam) {
            // console.debug(this);
            var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue(audioParam);

            // ATTACK
            audioParam.linearRampToValueAtTime(1.0, now + this.attackTime);
            ////this.triggerOut.setTargetAtTime(1.0, now, this.attackTime);

            // DECAY to SUSTAIN LEVEL
            var sustainLevel = this.sustainLevel;
            if (this.sustainLevel == 0)
                sustainLevel = 0.0001;

            

            ////this.triggerOut.exponentialRampToValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);
            ////this.triggerOut.setTargetAtTime(sustainLevel, now + this.attackTime, this.decayTime);
            audioParam.linearRampToValueAtTime(sustainLevel, (now + this.attackTime + this.decayTime));
            ////this.triggerOut.setValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);

            if (this.sustainLevel == 0)
                this.triggerOut.setValueAtTime(0, now + this.attackTime + this.decayTime);

        };

        EnvelopeGeneratorFacade.prototype.initiateReleasing = function(audioParam) {
            // console.debug(this);
            var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue(audioParam);

            // RELEASE
            audioParam.setTargetAtTime(0.0, now, this.releaseTime);
            ////this.triggerOut.linearRampToValueAtTime(0.0, now + this.releaseTime);
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValuesAndSetValue = function(audioParam) {
            var now = this.audioContext.currentTime;

            audioParam.cancelScheduledValues(now);
            
            // Anchor beginning of ramp at current value.
            audioParam.setValueAtTime(audioParam.value, now);

            return now;
        };

        //region iCanBeTriggered
        EnvelopeGeneratorFacade.prototype.gateOn = function(callback, originator) {
            this.trigger();
            // this.initiateTriggering();
            callback.call(originator, this.controlIn.gain);
        };

        EnvelopeGeneratorFacade.prototype.gateOff = function(callback, originator) {
            this.release();
            // this.initiateReleasing();
            callback(originator, this.controlIn.gain);
        };
        //endregion iCanBeTriggered

        return EnvelopeGeneratorFacade;
    }
);
