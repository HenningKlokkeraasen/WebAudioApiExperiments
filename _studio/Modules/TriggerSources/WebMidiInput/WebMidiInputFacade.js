/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/_Mixins/ICanTrigger.js',
    '/_studio/Modules/_Mixins/ICanSendPitchControlOut.js',
    '/_WebAudioApiFacades/WebMidiContext.js'
	], function(FacadeBase, ICanTrigger, ICanSendPitchControlOut, WebMidiContext) {
		WebMidiInputFacade.prototype = Object.create(FacadeBase.prototype);
		WebMidiInputFacade.prototype.constructor = WebMidiInputFacade;

		function WebMidiInputFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanTrigger.call(this);
			ICanSendPitchControlOut.call(this);

            this.gateOnCallback = this.initiateTriggering;
            this.gateOffCallback = this.initiateReleasing;

			return this;
		}

		// private
		WebMidiInputFacade.prototype.initNodes = function() {
		    this.input = undefined;
		    this.output = undefined;



		};

		// private
		WebMidiInputFacade.prototype.setDefaultValues = function() {
			this.glideTime = 0;
			

		};

		// private
		WebMidiInputFacade.prototype.wireUp = function() {






		};
		
		WebMidiInputFacade.prototype.setGlideTime = function(value) {
			this.glideTime = parseFloat(value);
		}

		WebMidiInputFacade.prototype.initKeyboard = function(outputForNoteNode) {
			var facade = this;
			this.outputForNoteNode = outputForNoteNode;

			new WebMidiContext(this.noteOn.bind(this), this.noteOff.bind(this), this.midiMessage.bind(this));
		};

		WebMidiInputFacade.prototype.noteOn = function(note, frequency) {
			var self = this;
			// console.debug('gate on');
			// console.debug(note);
			// console.debug(frequency);
			// console.debug('Note before multiplying with octave: ' + note
			// 	+ ' | frequency: ' + frequency);
			// console.debug('Note after  multiplying with octave: ' + note.substr(0, 1)
			// 	+ facade._currentOctave
			// 	+ ' | frequency: ' + frequencyMultipliedWithOctave);
			this.outputForNoteNode.textContent = note; // dirty DOM hack, TODO facade should not know about DOM

			this._setIsOn(note);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			var facade = this;

			if (this.controlDestinations != undefined)
				this.controlDestinations.forEach(function(destination) {
					var now = facade.audioContext.currentTime;
					if (destination.cancelScheduledValues != undefined)
						destination.cancelScheduledValues(now);
					// console.log(`glide time: ${self.glideTime}`);
					if (destination.exponentialRampToValueAtTime != undefined)
						destination.exponentialRampToValueAtTime(frequency, now + self.glideTime);
					// hack? will only work for oscillators
				});

			this.trigger();
		};

		WebMidiInputFacade.prototype.noteOff = function(note, frequency) {
			// console.debug('gate off');

			this._setNoLongerOn(note);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			if (!this._hasNotesOn())
				this.release();
		};
		
		WebMidiInputFacade.prototype.midiMessage = function(statusByte, dataByte1, dataByte2) {
			console.debug(`statusByte: ${statusByte} dataByte1: ${dataByte1} dataByte2: ${dataByte2}`);
		}

        WebMidiInputFacade.prototype.initiateTriggering = function(audioParam) {
            audioParam.value = 1;
        };

        WebMidiInputFacade.prototype.initiateReleasing = function(audioParam) {
            audioParam.value = 0;
        };

        WebMidiInputFacade.prototype._notesCurrentlyOn = [];

        WebMidiInputFacade.prototype._hasNotesOn = function() {
        	// console.debug('notesOn: ' + this._notesCurrentlyOn.length);
        	return this._notesCurrentlyOn.length > 0;
        };

        WebMidiInputFacade.prototype._setIsOn = function(note) {
        	var index = this._notesCurrentlyOn.indexOf(note);
			if (index < 0)
				this._notesCurrentlyOn.push(note);
        };

        WebMidiInputFacade.prototype._setNoLongerOn = function(note) {
        	var index = this._notesCurrentlyOn.indexOf(note);
			if (index > -1)
				this._notesCurrentlyOn.splice(index, 1);
        };

		return WebMidiInputFacade;
	}
);