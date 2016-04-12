/*
	Web Audio API wrapper - Web MIDI API note on, note off trigger module
*/
define([
	'Modules/_FacadeBase',
    'Modules/_Mixins/ICanTrigger',
    'Modules/_Mixins/ICanSetFrequency',
    'WaapiWrappers/WebMidiContext'
	], function(FacadeBase, ICanTrigger, ICanSetFrequency, WebMidiContext) {
		WebMidiInputFacade.prototype = Object.create(FacadeBase.prototype);
		WebMidiInputFacade.prototype.constructor = WebMidiInputFacade;

		function WebMidiInputFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanTrigger.call(this);
			ICanSetFrequency.call(this);

			this.audioContext = audioContext;

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
		
		WebMidiInputFacade.prototype.setDebugMode = function(value) {
			this.debugMode = value;
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
			// 	+ self._currentOctave
			// 	+ ' | frequency: ' + frequencyMultipliedWithOctave);
			this.outputForNoteNode.textContent = note; // dirty DOM hack, TODO facade should not know about DOM

			this._setIsOn(note);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			// BUG not possible to have an ADSR envelope generator trigger an OSC and at the same time setFrequency. One cancels out the other (cancelScheduledValuesAtTime)
			var audioTime = self.audioContext.currentTime;
			this.setFrequency(frequency, audioTime + this.glideTime);
			this.trigger(audioTime);
			this.gateOn(audioTime);
		};

		WebMidiInputFacade.prototype.noteOff = function(note, frequency) {
			// console.debug('gate off');

			this._setNoLongerOn(note);
			// console.debug('currently playing'); console.group(); this._notesCurrentlyOn.forEach(function(note) { console.debug(note); }); console.groupEnd();

			var audioTime = this.audioContext.currentTime;
			if (!this._hasNotesOn())
				this.release(audioTime);
			this.gateOff(audioTime);
		};
		
		WebMidiInputFacade.prototype.midiMessage = function(statusByte, dataByte1, dataByte2) {
			if (this.debugMode)
				console.debug(`statusByte: ${statusByte} dataByte1: ${dataByte1} dataByte2: ${dataByte2}`);
		}

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