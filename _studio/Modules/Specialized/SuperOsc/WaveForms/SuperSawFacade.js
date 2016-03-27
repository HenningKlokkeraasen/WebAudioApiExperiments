/*
	Web Audio API wrapper - oscillator
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
	'/_studio/Modules/BasicWaa/Gain/GainFacade.js'
	], function(OscillatorFacade, GainFacade) {
		SuperSawFacade.prototype = Object.create(OscillatorFacade.prototype); // new FacadeBase2();
		SuperSawFacade.prototype.constructor = SuperSawFacade;

		function SuperSawFacade(audioContext, numberOfOscillators = 7) {
			this.numberOfOscillators = numberOfOscillators;
			OscillatorFacade.call(this, audioContext); // base()
			// FacadeBase2.call(this, audioContext); // ??
			
			return this;
		};

		// private
		SuperSawFacade.prototype.initNodes = function() {
			this.oscillators = [];
			this.mixers = [];
			for (var i = 0; i < this.numberOfOscillators; i++) {
				this.oscillators.push(this.audioContext.createOscillator());
				this.mixers.push(this.audioContext.createGain());
			}

			this.shaper = this.audioContext.createBiquadFilter();

			// output
			this.output = this.audioContext.createGain();
		};

		// private
		SuperSawFacade.prototype.setDefaultValues = function() {
			this.oscillators.forEach(function(osc) {
				osc.type = 'sawtooth';
				osc.start(0);
			});

			// 
			var center = (this.oscillators.length - 1) / 2;
			var detuneIteration = 0;
			var detuneStart = 0;
			var detuneFactor = 2.4;
			// console.debug('center: ' + center);
			for (var i = center + 1; i < this.oscillators.length; i++) {
				var j = this.oscillators.length -1 - i;

				var detune = (detuneIteration++ * detuneFactor) + detuneStart;
				
				// console.debug('i: ' + i + ' j: ' + j + ' detune i : ' + detune + ' detune j: ' + (detune*-1));

				this.oscillators[i].detune.value = detune;
				this.oscillators[j].detune.value = detune * -1;
			};

			this.mixers[center].gain.value = 0.5; // todo

			this.shaper.type = 'highpass';
			this.shaper.frequency.value = 440;
			
			this.output.gain.value = 0;






		// var d=12;
		// 	for (var i = 0; i < this.oscillators.length; i++) {
		// 		//var detune = 12

		// 		var x = -d + i * 2 * d / (this.oscillators.length - 1);
		// 		console.debug(x);
		// 	};

		};

		// private
		SuperSawFacade.prototype.wireUp = function() {
			var self = this;
			var i = 0;
			this.oscillators.forEach(function(osc) {
				osc.connect(self.mixers[i]);
				self.mixers[i].connect(self.shaper);
				i++;
			});
			this.shaper.connect(this.output);
		};

		SuperSawFacade.prototype.setType = function(type) {
			// not applicable
			return this;
		};

		SuperSawFacade.prototype.setFrequency = function(frequency) {
			var f = parseFloat(frequency);
			this.oscillators.forEach(function(osc) {
				osc.frequency.value = f;
			});
			this.shaper.frequency.value = f;
			return this;
		};

		SuperSawFacade.prototype.setDetune = function(amount) {
			//TODO
			return this;
		};

		SuperSawFacade.prototype.pitchBendIsh = function(detuneValue) {
			//TODO
			return this;
		};

		SuperSawFacade.prototype.start = function() {
			this.output.gain.value = 1;
			return this;
		};

		SuperSawFacade.prototype.stop = function() {
			this.output.gain.value = 0;
			return this;
		};

		return SuperSawFacade;
	}
);
