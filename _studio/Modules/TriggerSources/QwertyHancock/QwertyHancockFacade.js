// TODO enable triggering from qwerty hancock to eg

/*
	Web Audio API wrapper - Gain
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		QwertyHancockFacade.prototype = Object.create(FacadeBase.prototype);
		QwertyHancockFacade.prototype.constructor = QwertyHancockFacade;

		function QwertyHancockFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()

		    this.controlDestinations = [];
		    this.triggerDestinations = [];

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

		QwertyHancockFacade.prototype.setTriggerFor = function(destination) {
			this.triggerDestinations.push(destination);
		    return this;
		};

		QwertyHancockFacade.prototype.setKeyboard = function(keyboard) {
			
			var facade = this;

			keyboard.keyDown = function (note, frequency) {

				// console.debug('gate on');
				console.log(note);
				// console.debug(frequency);

				facade.controlDestinations.forEach(function(destination) {

					// Uncomment this for glide/portamento
					var now = facade.audioContext.currentTime;
					destination.cancelScheduledValues(now);

					destination.value = frequency; // hack? will only work for oscillators
				});

				facade.triggerDestinations.forEach(function(destination){
					destination.value = 1; // gateOn	TODO will only work for gain nodes
				});
			    
			};

			keyboard.keyUp = function (note, frequency) {

				// console.debug('gate off');

				facade.triggerDestinations.forEach(function(destination){
					destination.value = 0; // gateOff	TODO will only work for gain nodes
				});
			    
			};
		};

		return QwertyHancockFacade;
	}
);