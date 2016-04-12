//http://www.html5rocks.com/en/tutorials/audio/scheduling/
define([
    'Modules/_Mixins/ICanTrigger',
    'Modules/_Mixins/ICanSetFrequency',], function(ICanTrigger, ICanSetFrequency) {
	class StepSequencer {
		constructor(audioContext) {
			ICanTrigger.call(this);
			ICanSetFrequency.call(this);
				
			this.audioContext = audioContext;

			this.setInitialValues();
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
				this.steps.push({ isOn: false, frequency: this.masterFrequency, noteLength: this.noteLength });
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

		setOnOff(isOn, additionalParameters) {
			this.steps[additionalParameters.stepNumber].isOn = isOn == 1;
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
			
			if (this.steps[stepNumber].isOn)
				this.noteOn(stepNumber, f, nextNoteTime);
		}
		
		scheduleNoteOff(stepNumber, nextNoteTime) {
			if (!this.isOn)
				return;
			//console.log('noteoff at ' + nextNoteTime);
			this.noteOff(stepNumber, nextNoteTime + this.steps[stepNumber].noteLength);
		}
		
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

		toggleStartStop() {
			if (this.isOn)
				this.stop();
			else
				this.start();
		}
		
		noteOn(stepNumber, frequency, audioTime) {
			var self = this;
			this._setIsOn(stepNumber);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			// BUG not possible to have an ADSR envelope generator trigger an OSC and at the same time setFrequency. One cancels out the other (cancelScheduledValuesAtTime)
			this.setFrequency(frequency, audioTime /*+ this.glideTime*/);
			this.trigger(audioTime);
			this.gateOn(audioTime);
		}

		noteOff(stepNumber, audioTime) {
			var self = this;

			this._setNoLongerOn(stepNumber);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			this.release(audioTime);
			this.gateOff(audioTime);
		}

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
	}
	return StepSequencer;
});