/*
	Web Audio API wrapper - WaveShaper
	http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
*/
define([
	'/_studio/Modules/_FacadeBase.js'
	], function(FacadeBase) {
		WaveShaperFacade.prototype = Object.create(FacadeBase.prototype);
		WaveShaperFacade.prototype.constructor = WaveShaperFacade;

		function WaveShaperFacade(audioContext) {
		    FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		WaveShaperFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createWaveShaper();
		    this.output = this.input; // TODO verify



		};

		// private
		WaveShaperFacade.prototype.setDefaultValues = function() {
		    this.amount = 50;
		    
		    
		};

		// private
		WaveShaperFacade.prototype.wireUp = function() {






		};

		WaveShaperFacade.prototype.setAmount = function(value) {
			this.amount = value;
			var curve = this.makeDistortionCurve(value);
			this.input.curve = curve;
			return this;
		};

		WaveShaperFacade.prototype.setOversample = function(value) {
			this.input.oversample = value;
			return this;
		};

		// private
		WaveShaperFacade.prototype.makeDistortionCurve = function(amount) {
			var k = amount;
			var numberOfSamples = 44100;
			var curve = new Float32Array(numberOfSamples);
			var deg = Math.PI / 180;
			var i = 0;
			var x;
			for (; i < numberOfSamples; ++i) {
				x = i * 2 / numberOfSamples - 1;
				curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
			}
			return curve;
		};

		return WaveShaperFacade;
	}
);