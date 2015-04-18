/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/_Mixins/ICanTrigger.js',
	], function(FacadeBase, ICanTrigger) {
		QwertyHancockFacade.prototype = Object.create(FacadeBase.prototype);
		QwertyHancockFacade.prototype.constructor = QwertyHancockFacade;

		function QwertyHancockFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			ICanTrigger.call(this);

		    this.controlDestinations = [];

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



		};

		// private
		QwertyHancockFacade.prototype.wireUp = function() {






		};

		QwertyHancockFacade.prototype.control = function(destination) {
			this.controlDestinations.push(destination);
			return this;
		};

		QwertyHancockFacade.prototype.initKeyboard = function(keyboard, outputForNoteNode) {
			var facade = this;
			this.outputForNoteNode = outputForNoteNode;

			keyboard.keyDown = function (note, frequency) {

				// console.debug('gate on');
				// console.debug(note);
				// console.debug(frequency);
				facade.outputForNoteNode.textContent = note; // dirty DOM hack, TODO facade should not know about DOM

				facade.controlDestinations.forEach(function(destination) {

					// Uncomment this for glide/portamento
					var now = facade.audioContext.currentTime;
					destination.cancelScheduledValues(now);

					destination.value = frequency; // hack? will only work for oscillators
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

		return QwertyHancockFacade;
	}
);