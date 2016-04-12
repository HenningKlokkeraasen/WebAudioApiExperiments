/*
	QwertyHancock: listens to events from QwertyHancock.js to trigger noteOn, noteOff
*/
define([
	'Modules/_FacadeBase',
    'Modules/_Mixins/ICanTrigger',
    'Modules/_Mixins/ICanSetFrequency',
	], function(FacadeBase, ICanTrigger, ICanSetFrequency) {
		QwertyHancockFacade.prototype = Object.create(FacadeBase.prototype);
		QwertyHancockFacade.prototype.constructor = QwertyHancockFacade;

		function QwertyHancockFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanTrigger.call(this);
			ICanSetFrequency.call(this);

			this.audioContext = audioContext;

			return this;
		}

		// private
		QwertyHancockFacade.prototype.initNodes = function() {
		    this.input = undefined;
		    this.output = undefined;
		};

		// private
		QwertyHancockFacade.prototype.setDefaultValues = function() {
			this._currentOctave = 4;
			this.glideTime = 0;
		};

		// private
		QwertyHancockFacade.prototype.wireUp = function() {
		};

		QwertyHancockFacade.prototype.setGlideTime = function(value) {
			this.glideTime = parseFloat(value);
		}

		QwertyHancockFacade.prototype.setOctave = function(octave) {
			this._currentOctave = Math.round(octave);
		};

		QwertyHancockFacade.prototype.initKeyboard = function(keyboard, outputForNoteNode) {
			this.outputForNoteNode = outputForNoteNode;

			keyboard.keyDown = QwertyHancock.prototype.noteOn.bind(this);
			keyboard.keyUp = QwertyHancock.prototype.noteOff.bind(this);
		};

		QwertyHancock.prototype.noteOn = function(note, frequency) {
			var self = this;
			var frequencyMultipliedWithOctave = self.getFrequencyMultipliedByCurrentOctave(frequency);

			// console.debug('gate on');
			// console.debug(note);
			// console.debug(frequency);
			// console.debug('Note before multiplying with octave: ' + note
			// 	+ ' | frequency: ' + frequency);
			// console.debug('Note after  multiplying with octave: ' + note.substr(0, 1)
			// 	+ self._currentOctave
			// 	+ ' | frequency: ' + frequencyMultipliedWithOctave);
			self.outputForNoteNode.textContent = note.substr(0, 1)
				+ self.getQHOctaveQualifiedByCurrentOctave(note.substr(1,1)); // dirty DOM hack, TODO facade should not know about DOM

			// BUG not possible to have an ADSR envelope generator trigger an OSC and at the same time setFrequency. One cancels out the other (cancelScheduledValuesAtTime)
			var audioTime = self.audioContext.currentTime;
			this.setFrequency(frequency, audioTime + this.glideTime);
			this.trigger(audioTime);
			this.gateOn(audioTime);
		};

		QwertyHancock.prototype.noteOff = function(note, frequency) {
			var audioTime = this.audioContext.currentTime;
			this.release(audioTime);
			this.gateOff(audioTime);
		};

		// what to add the octave set in QwertyHancock with, to get the currentOctave
		QwertyHancockFacade.prototype.multiplierTableQHOctave = {
			0 : -4,
			1 : -3,
			2 : -2,
			3 : -1,
			4 : 0,
			5 : 1,
			6 : 2,
			7 : 3,
			8 : 4
		};

		// what to multiply the note at octave 4 with, to get the freq in the currentOctave
		QwertyHancockFacade.prototype.multiplierTableFreq = {
			0 : 0.0625,
			1 : 0.125,
			2 : 0.25,
			3 : 0.5,
			4 : 1,
			5 : 2,
			6 : 3,
			7 : 4,
			8 : 5
		};

		QwertyHancockFacade.prototype.getQHOctaveQualifiedByCurrentOctave = function(qhOctave) {
			// Increase / decrease frequencey according to current octave
			var oct = parseInt(qhOctave) + this.multiplierTableQHOctave[this._currentOctave];
			
			return oct;
		};

		QwertyHancockFacade.prototype.getFrequencyMultipliedByCurrentOctave = function(freqUnmapped) {
			// Increase / decrease frequencey according to current octave
			var freq = freqUnmapped * this.multiplierTableFreq[this._currentOctave];
			
			return freq;
		};

		return QwertyHancockFacade;
	}
);