//http://www.html5rocks.com/en/tutorials/audio/scheduling/
define([
    '/_studio/Modules/_Mixins/ICanTrigger.js',
    '/_studio/Modules/_Mixins/ICanSetFrequency.js',], function(ICanTrigger, ICanSetFrequency) {
	class StepSequencer {
		constructor(audioContext) {
			ICanTrigger.call(this);
			ICanSetFrequency.call(this);
				
			this.audioContext = audioContext;

			this.setInitialValues();

            this.gateOnCallback = this.initiateTriggering;
            this.gateOffCallback = this.initiateReleasing;
		}

		setInitialValues() {
			this.isOn = false;
			this.tempoInBpm = 200;
			this.masterFrequency = 440;
			this.noteLength = 0.2;//input.noteLength;
			this.numberOfSteps = 16;//input.numberOfSteps;
			this.schedulingIntervalInMilliseconds = 100;//input.schedulingIntervalInMilliseconds;
			this.overlapInMilliseconds = 25;//input.overlapInMilliseconds;
			this.scheduleAheadTimeInSeconds = this.calculateScheduleAheadTimeInSeconds(
				this.schedulingIntervalInMilliseconds, this.overlapInMilliseconds);
			this.nextNoteTime = 0.0;
			this.timerId = 0;
			
			this.steps = new Array();
			for (let i = 0; i < this.numberOfSteps; i++) {
				this.steps.push({ frequency: this.masterFrequency, noteLength: this.noteLength });
			}
			
			this._notesCurrentlyOn = [];
			this.glideTime = 0;
		}

		setTempoInBpm(tempoInBpm) {
			this.tempoInBpm = tempoInBpm;
		}
		
		setMasterFrequency(frequency) {
			this.masterFrequency = frequency;
		}

		setStepFrequency(frequency, additionalParameters) {
			this.steps[additionalParameters.stepNumber].frequency = frequency;
		}

		setStepLength(noteLength, additionalParameters) {
			this.steps[additionalParameters.stepNumber].noteLength = noteLength;
		}

		calculateScheduleAheadTimeInSeconds(schedulingIntervalInMilliseconds, overlapInMilliseconds) {
			return (schedulingIntervalInMilliseconds + overlapInMilliseconds) / 100;
		}
		
		scheduleNoteOn(stepNumber, nextNoteTime) {
			if (!this.isOn)
				return;
			
			var f = this.masterFrequency + 	this.steps[stepNumber].frequency;
			
			this.noteOn(stepNumber, f, nextNoteTime);
			
			// this.dispatchNoteEvents(f, nextNoteTime);
		}
		
		scheduleNoteOff(stepNumber, nextNoteTime) {
			if (!this.isOn)
				return;
			//console.log('noteoff at ' + nextNoteTime);
			this.noteOff(stepNumber, nextNoteTime + this.steps[stepNumber].noteLength);
			
			// this.dispatchNoteEvents(f, audioTime);
		}
		
		// dispatchNoteEvents(frequency, audioTime) {
			// var noteEvent = new CustomEvent('stepSequencerNote', { detail: { startTime: audioTime, frequency: frequency, stopTime: audioTime + this.noteLength } });
			// window.dispatchEvent(noteEvent);
		// }
		
		advanceToNextNote() {
			var secondsPerBeat = 60.0 / this.tempoInBpm;
			this.nextNoteTime += (this.schedulingIntervalInMilliseconds / 100) * secondsPerBeat;
			
			this.current16thNote++;
			if (this.current16thNote == this.numberOfSteps) {
				this.current16thNote = 0;
			}
		}
		
		scheduleNotesThatFallInThisInterval() {
			while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTimeInSeconds) {
				this.scheduleNoteOn(this.current16thNote, this.nextNoteTime);
				this.scheduleNoteOff(this.current16thNote, this.nextNoteTime);
				this.advanceToNextNote();
			}
			var that = this;
			this.timerId = window.setTimeout(that.scheduleNotesThatFallInThisInterval.bind(that), that.schedulingIntervalInMilliseconds);
		}
		
		start() {
			this.isOn = true;
			this.current16thNote = 0;
			this.nextNoteTime = this.audioContext.currentTime;
			this.scheduleNotesThatFallInThisInterval();
		}
		
		stop() {
			this.isOn = false;
			window.clearTimeout( this.timerId );
		}
		
		noteOn(stepNumber, frequency, audioTime) {
			var self = this;
			this._setIsOn(stepNumber);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			var facade = this;

			if (self.facadesToTrigger != undefined)
				self.facadesToTrigger.forEach(function(facade) {
					facade.output.gain.setValueAtTime(1, audioTime);
				});

			var self = this;

			if (self.frequencySetDestinations != undefined)
				self.frequencySetDestinations.forEach(function(destination) {
					var now = self.audioContext.currentTime;
					destination.cancelScheduledValues(audioTime);
					// console.log(`glide time: ${self.glideTime}`);
					destination.setValueAtTime(frequency, audioTime);
					// hack? will only work for oscillators
				});


			//console.log(audioTime);
			//this.trigger();
		}

		noteOff(stepNumber, audioTime) {
			var self = this;
			// console.debug('gate off');

			this._setNoLongerOn(stepNumber);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			// if (!this._hasNotesOn())
				//this.release();

			if (self.facadesToTrigger != undefined)
				self.facadesToTrigger.forEach(function(facade) {
					facade.output.gain.setValueAtTime(0, audioTime);
				});

		}

        // initiateTriggering(audioParam) {
        //     audioParam.value = 1;
        // }

        // initiateReleasing(audioParam) {
        //     audioParam.value = 0;
        // }

        _hasNotesOn() {
        	// console.debug('notesOn: ' + this._notesCurrentlyOn.length);
        	return this._notesCurrentlyOn.length > 0;
        }

        _setIsOn(note) {
        	var index = this._notesCurrentlyOn.indexOf(note);
			if (index < 0)
				this._notesCurrentlyOn.push(note);
        }

        _setNoLongerOn(note) {
        	var index = this._notesCurrentlyOn.indexOf(note);
			if (index > -1)
				this._notesCurrentlyOn.splice(index, 1);
        }

        initGateOn() {
        	console.log('step sequencer gate on');
        	this.start();
        }

        initGateOff() {
        	console.log('step sequencer gate off');
        	this.stop();
        }

        initiateTriggering(audioParam, rampUpToValue, overrideSustainLevel) {
			var self = this;
			if (this.facadesToTrigger != undefined)
				this.facadesToTrigger.forEach(function(facade) {
					 // console.debug('calling gateOn for ')
					// console.debug(facade);
					// console.debug(self.gateOnCallback);
					facade.gateOn(self.gateOnCallback, self);
				});
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
            audioParam.linearRampToValueAtTime(rampUpToValue, (now ));
            ////this.triggerOut.setTargetAtTime(1.0, now, this.attackTime);

            // DECAY to SUSTAIN LEVEL
            var sustainLevel = this.sustainLevel;
            // if (this.sustainLevel == 0)
            //     sustainLevel = 0.0001;

            

            // audioParam.linearRampToValueAtTime(sustainLevel, (now + this.noteLength));

            // if (this.sustainLevel == 0)
            //     audioParam.setValueAtTime(rampDownToValue, now + this.attackTime + this.decayTime);

        }
		 
        initiateReleasing(audioParam, rampDownToValue) {
            // console.debug(audioParam);
			
            // var now = this.getCurrentTimeAndCancelScheduledValuesAtTime(audioParam, this.releaseTime);
			var now = this.audioContext.currentTime;
			audioParam.cancelScheduledValues(now);
			// var value = audioParam.value;
			
			// TODO truncate attack (required as linearRamp is removed by cancelScheduledValues)

			audioParam.setValueAtTime(audioParam.value, (now + 0.0001));
			
            // RELEASE
            // audioParam.setTargetAtTime(rampDownToValue, now, this.releaseTime);
			audioParam.linearRampToValueAtTime(rampDownToValue, (now + 0.0001 ));	
			
			// audioParam.cancelScheduledValues(now + this.releaseTime);
        }

        getCurrentTimeAndCancelScheduledValuesAndSetValue(audioParam) {
            var now = this.getCurrentTimeAndCancelScheduledValues(audioParam);

            // Anchor beginning of ramp at current value.
            audioParam.setValueAtTime(audioParam.value, now);

            return now;
        }

        getCurrentTimeAndCancelScheduledValues(audioParam) {
            var now = this.audioContext.currentTime;

            audioParam.cancelScheduledValues(now);

            return now;
        }

        getCurrentTimeAndCancelScheduledValuesAtTime(audioParam, time) {
            var now = this.audioContext.currentTime;

            audioParam.cancelScheduledValues(time);

            return now;
        }

	}
	return StepSequencer;
});