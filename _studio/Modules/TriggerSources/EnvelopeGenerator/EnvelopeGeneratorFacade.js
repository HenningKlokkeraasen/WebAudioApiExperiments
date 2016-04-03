/*
    Web Audio API - custom nodes - Envelope Generator
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html
	
	// TODO add UI to control wether attack, decay and release should be linear, exponential or logarithmic
	
	// TODO re-trigger
	
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
            this.triggerIn = this.audioContext.createGain();




        };

        // private
        EnvelopeGeneratorFacade.prototype.setDefaultValues = function() {
            this.triggerIn.gain.value = 0;


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
        EnvelopeGeneratorFacade.prototype.initiateTriggering = function(audioParam, rampUpToValue, rampDownToValue, overrideSustainLevel) {
            // console.debug(this);
			
			// Ensure not exactly 0 values, they dont work so good
			// if (rampUpToValue === 0)
			// 	rampUpToValue = 0.0001; // TODO what if it is supposed to be a negative value?
				
			// if (rampDownToValue === 0)
			// 	rampDownToValue = 0.0001; // TODO what if it is supposed to be a negative value?
			
            var now = this.getCurrentTimeAndCancelScheduledValuesAndSetValue(audioParam);

            if (overrideSustainLevel)
                this.sustainLevel = overrideSustainLevel;

            // ATTACK
            audioParam.linearRampToValueAtTime(rampUpToValue, (now + this.attackTime));
            ////this.triggerOut.setTargetAtTime(1.0, now, this.attackTime);

            // DECAY to SUSTAIN LEVEL
            var sustainLevel = this.sustainLevel;
            // if (this.sustainLevel == 0)
            //     sustainLevel = 0.0001;

            

            ////this.triggerOut.exponentialRampToValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);
            ////this.triggerOut.setTargetAtTime(sustainLevel, now + this.attackTime, this.decayTime);
            audioParam.linearRampToValueAtTime(sustainLevel, (now + this.attackTime + this.decayTime));
            ////this.triggerOut.setValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);

            // if (this.sustainLevel == 0)
            //     audioParam.setValueAtTime(rampDownToValue, now + this.attackTime + this.decayTime);

        };
		 
        EnvelopeGeneratorFacade.prototype.initiateReleasing = function(audioParam, rampDownToValue) {
            // console.debug(audioParam);
			
            // var now = this.getCurrentTimeAndCancelScheduledValuesAtTime(audioParam, this.releaseTime);
			var now = this.audioContext.currentTime;
			audioParam.cancelScheduledValues(now);
			// var value = audioParam.value;
			
			// TODO truncate attack (required as linearRamp is removed by cancelScheduledValues)

			audioParam.setValueAtTime(audioParam.value, (now + 0.0001));
			
            // RELEASE
            // audioParam.setTargetAtTime(rampDownToValue, now, this.releaseTime);
			audioParam.linearRampToValueAtTime(rampDownToValue, (now + 0.0001 + this.releaseTime));	
			
			// audioParam.cancelScheduledValues(now + this.releaseTime);
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValuesAndSetValue = function(audioParam) {
            var now = this.getCurrentTimeAndCancelScheduledValues(audioParam);

            // Anchor beginning of ramp at current value.
            audioParam.setValueAtTime(audioParam.value, now);

            return now;
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValues = function(audioParam) {
            var now = this.audioContext.currentTime;

            audioParam.cancelScheduledValues(now);

            return now;
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTimeAndCancelScheduledValuesAtTime = function(audioParam, time) {
            var now = this.audioContext.currentTime;

            audioParam.cancelScheduledValues(time);

            return now;
        };

        //region iCanBeTriggered
        EnvelopeGeneratorFacade.prototype.gateOn = function(callback, originator) {
            this.trigger();
            // this.initiateTriggering();
            callback.call(originator, this.triggerIn.gain);
        };

        EnvelopeGeneratorFacade.prototype.gateOff = function(callback, originator) {
            this.release();
            // this.initiateReleasing();
            callback(originator, this.triggerIn.gain);
        };
        //endregion iCanBeTriggered

        return EnvelopeGeneratorFacade;
    }
);
