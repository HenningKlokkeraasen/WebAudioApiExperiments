/*
    Web Audio API - custom nodes - Envelope Generator
    From http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html
	
	// TODO add UI to control wether attack, decay and release should be linear, exponential or logarithmic
	// TODO re-trigger

        // TODO for triggering/EG
        // Sustain level as percentage of destination.value
        // gateOn: set to destination.startValue
        // gateOn: attack to destination.value
        // gateOff: release to destination.endValue
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

            // Implementation of ICanBeTriggered
            this.onGateOn = EnvelopeGeneratorFacade.prototype.onGateOn;
            this.onGateOff = EnvelopeGeneratorFacade.prototype.onGateOff;

            return this;
        }

        // private
        EnvelopeGeneratorFacade.prototype.initNodes = function() {
        };

        // private
        EnvelopeGeneratorFacade.prototype.setDefaultValues = function() {
            this.isOn = false;
        };

        // private
        EnvelopeGeneratorFacade.prototype.wireUp = function() {
        };

        EnvelopeGeneratorFacade.prototype.toggleGateOnOff = function() {
            if (this.isOn)
                this.initGateOff();
            else
                this.initGateOn();
        }

        EnvelopeGeneratorFacade.prototype.initGateOn = function() {
            this.isOn = true;
            var audioTime = this.getCurrentTime();
            this.trigger(audioTime);
            this.onGateOn(audioTime);
        };

        EnvelopeGeneratorFacade.prototype.initGateOff = function() {
            this.isOn = false;
            var audioTime = this.getCurrentTime();
            this.release(audioTime);
            this.onGateOff(audioTime);
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

        // Implementation of ICanBeTrigger
        EnvelopeGeneratorFacade.prototype.onGateOn = function(audioTime) {
            // console.log('EG onGateOn');
            // console.log(this);
            var self = this;
            if (this.facadesToTrigger != undefined)
                this.facadesToTrigger.forEach(function(facade) {
                    if (facade.triggerIn)
                        self.runAttackDecay(facade.triggerIn, 1, audioTime);
                });
        };

        EnvelopeGeneratorFacade.prototype.onGateOff = function(audioTime) {
            // console.log('EG onGateOff');
            // console.log(this);
            var self = this;
            if (this.facadesToTrigger != undefined)
                this.facadesToTrigger.forEach(function(facade) {
                    if (facade.triggerIn)
                        self.runRelease(facade.triggerIn, 0, audioTime);
                });
        };
        // End Implementation of ICanBeTrigger

        //
        // private
        //
        EnvelopeGeneratorFacade.prototype.runAttackDecay = function(audioParam, rampUpToValue, audioTime) {
            // console.debug(this);
			
			// Ensure not exactly 0 values, they dont work so good
			// if (rampUpToValue === 0)
			// 	rampUpToValue = 0.0001; // TODO what if it is supposed to be a negative value?
				
			// if (rampDownToValue === 0)
			// 	rampDownToValue = 0.0001; // TODO what if it is supposed to be a negative value?
			
            audioParam.cancelScheduledValues(audioTime);

            // Anchor beginning of ramp at current value.
            audioParam.setValueAtTime(audioParam.value, audioTime);

            // if (overrideSustainLevel)
            //     this.sustainLevel = overrideSustainLevel;

            // ATTACK
            audioParam.linearRampToValueAtTime(rampUpToValue, (audioTime + this.attackTime));
            ////this.triggerOut.setTargetAtTime(1.0, now, this.attackTime);

            // DECAY to SUSTAIN LEVEL
            var sustainLevel = this.sustainLevel;
            // if (this.sustainLevel == 0)
            //     sustainLevel = 0.0001;

            ////this.triggerOut.exponentialRampToValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);
            ////this.triggerOut.setTargetAtTime(sustainLevel, now + this.attackTime, this.decayTime);
            audioParam.linearRampToValueAtTime(sustainLevel, (audioTime + this.attackTime + this.decayTime));
            ////this.triggerOut.setValueAtTime(sustainLevel, now + this.attackTime + this.decayTime);

            // if (this.sustainLevel == 0)
            //     audioParam.setValueAtTime(rampDownToValue, now + this.attackTime + this.decayTime);
        };
		 
        EnvelopeGeneratorFacade.prototype.runRelease = function(audioParam, rampDownToValue, audioTime) {
            // console.debug(audioParam);
			
			audioParam.cancelScheduledValues(audioTime);
			// var value = audioParam.value;
			
			// TODO truncate attack (required as linearRamp is removed by cancelScheduledValues)

			audioParam.setValueAtTime(audioParam.value, (audioTime + 0.0001));
			
            // RELEASE
            // audioParam.setTargetAtTime(rampDownToValue, now, this.releaseTime);
			audioParam.linearRampToValueAtTime(rampDownToValue, (audioTime + 0.0001 + this.releaseTime));	
        };

        EnvelopeGeneratorFacade.prototype.getCurrentTime = function() {
            var now = this.audioContext.currentTime;
            return now;
        }

        return EnvelopeGeneratorFacade;
    }
);
