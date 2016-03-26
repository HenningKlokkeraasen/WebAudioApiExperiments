define([
    '/_studio/Modules/_Mixins/ICanTrigger.js',
    '/_studio/Modules/_Mixins/ICanSendPitchControlOut.js',], function(ICanTrigger, ICanSendPitchControlOut) {
	class StepSequencer {
		constructor(input) {
			ICanTrigger.call(this);
			ICanSendPitchControlOut.call(this);
				
			this.audioContext = input.audioContext;
			this.on = false;
			this.tempoInBpm = input.tempoInBpm;
			this.noteLength = input.noteLength;
			this.numberOfSteps = input.numberOfSteps;
			this.schedulingIntervalInMilliseconds = input.schedulingIntervalInMilliseconds;
			this.overlapInMilliseconds = input.overlapInMilliseconds;
			this.scheduleAheadTimeInSeconds = this.calculateScheduleAheadTimeInSeconds(
				input.schedulingIntervalInMilliseconds, input.overlapInMilliseconds);
			this.nextNoteTime = 0.0;
			this.timerId = 0;
			
			this.steps = new Array();
			for (let i = 0; i < input.numberOfSteps; i++) {
				this.steps.push({ frequency: 440, noteLength: input.noteLength });
			}
			
			this._notesCurrentlyOn = [];
			this.glideTime = 0;
		}
		
		calculateScheduleAheadTimeInSeconds(schedulingIntervalInMilliseconds, overlapInMilliseconds) {
			return (schedulingIntervalInMilliseconds + overlapInMilliseconds) / 100;
		}
		
		scheduleNote(stepNumber, audioTime) {
			if (!this.on)
				return;
			
			var f;
			if (! (stepNumber % 16) )         // beat 0 == low pitch
				f = 220.0;
			else if (stepNumber % 4)          // quarter notes = medium pitch
				f = 440.0;
			else                              // other 16th notes = high pitch
				f = 880.0;
			
			this.noteOnOff(stepNumber, f, audioTime);
			
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
				this.scheduleNote(this.current16thNote, this.nextNoteTime);
				this.advanceToNextNote();
			}
			var that = this;
			this.timerId = window.setTimeout(that.scheduleNotesThatFallInThisInterval.bind(that), that.schedulingIntervalInMilliseconds);
		}
		
		start() {
			this.on = true;
			this.current16thNote = 0;
			this.nextNoteTime = this.audioContext.currentTime;
			this.scheduleNotesThatFallInThisInterval();
		}
		
		stop() {
			this.on = false;
			window.clearTimeout( this.timerId );
		}
		
		noteOnOff(stepNumber, frequency, audioTime) {
			var self = this;
			// console.debug('gate on');
			// console.debug(note);
			// console.debug(frequency);
			// console.debug('Note before multiplying with octave: ' + note
			// 	+ ' | frequency: ' + frequency);
			// console.debug('Note after  multiplying with octave: ' + note.substr(0, 1)
			// 	+ facade._currentOctave
			// 	+ ' | frequency: ' + frequencyMultipliedWithOctave);
			
			// this.outputForNoteNode.textContent = note; // dirty DOM hack, TODO facade should not know about DOM

			this._setIsOn(stepNumber);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			var facade = this;

			this.controlDestinations.forEach(function(destination) {
				// if (destination.cancelScheduledValues != undefined)
				// 	destination.cancelScheduledValues(now);
				// console.log(`glide time: ${self.glideTime}`);
				// if (destination.exponentialRampToValueAtTime != undefined)
				// 	destination.exponentialRampToValueAtTime(frequency, now + self.glideTime);
				// hack? will only work for oscillators
				
				destination.frequency.s
			});

			this.trigger();
		};

		noteOff(note, frequency) {
			// console.debug('gate off');

			this._setNoLongerOn(note);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			if (!this._hasNotesOn())
				this.release();
		};

        initiateTriggering(audioParam) {
            audioParam.value = 1;
        }

        initiateReleasing(audioParam) {
            audioParam.value = 0;
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