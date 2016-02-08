/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/_Mixins/ICanTrigger.js',
    '/_studio/Modules/_Mixins/IcanSendPitchControlOut.js',
	], function(FacadeBase, ICanTrigger, ICanSendPitchControlOut) {
		QwertyHancockFacade.prototype = Object.create(FacadeBase.prototype);
		QwertyHancockFacade.prototype.constructor = QwertyHancockFacade;

		function QwertyHancockFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanTrigger.call(this);
			ICanSendPitchControlOut.call(this);

            this.gateOnCallback = this.initiateTriggering;
            this.gateOffCallback = this.initiateReleasing;

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
			var self = this;
			var facade = this;
			this.outputForNoteNode = outputForNoteNode;

			keyboard.keyDown = function (note, frequency) {

				var frequencyMultipliedWithOctave = facade.getFrequencyMultipliedByCurrentOctave(frequency);

				// console.debug('gate on');
				// console.debug(note);
				// console.debug(frequency);
				// console.debug('Note before multiplying with octave: ' + note
				// 	+ ' | frequency: ' + frequency);
				// console.debug('Note after  multiplying with octave: ' + note.substr(0, 1)
				// 	+ facade._currentOctave
				// 	+ ' | frequency: ' + frequencyMultipliedWithOctave);
				facade.outputForNoteNode.textContent = note.substr(0, 1)
					+ facade.getQHOctaveQualifiedByCurrentOctave(note.substr(1,1)); // dirty DOM hack, TODO facade should not know about DOM

				facade.controlDestinations.forEach(function(destination) {
					var now = facade.audioContext.currentTime;
					destination.cancelScheduledValues(now);
					// console.log(`glide time: ${self.glideTime}`);
					destination.exponentialRampToValueAtTime(frequencyMultipliedWithOctave, now + self.glideTime);
					// hack? will only work for oscillators
				});

				facade.trigger();
			};

			keyboard.keyUp = function (note, frequency) {

				// console.debug('gate off');

				facade.release();
			};
		};

        QwertyHancockFacade.prototype.initiateTriggering = function(audioParam) {
            audioParam.value = 1;
        };

        QwertyHancockFacade.prototype.initiateReleasing = function(audioParam) {
            audioParam.value = 0;
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