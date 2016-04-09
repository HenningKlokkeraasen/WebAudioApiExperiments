/*
	SuperOsc!
	 - 4 built-in waveforms
	 - ramp down (inverted sawtooth)
	 - sawtooth-triangular (ref. Minimoog)
	 - pulse with variable pulse width
	 - super saw 7 (Roland JP-8000)
	 - super saw 9 (Access Virus TI)
	 
	 TODO: avoid newing up all different types, could be costly,
	 since SuperOsc now will start 12-14 oscillators,
	 an 8-voice polyphonic 3-tone timbral synth with this would start up 288 oscillators
	 
	 TODO: make it triggerable, modulatable
	 make SuperSaw be able to re-generate its oscillators instead of creating three instances of the facade
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
	'/_studio/Modules/Specialized/SuperOsc/WaveForms/SawtoothTriangular.js',
	'/_studio/Modules/Specialized/SuperOsc/WaveForms/PulseWaveFacade.js',
	'/_studio/Modules/Specialized/SuperOsc/WaveForms/SuperSawFacade.js'
	], function(FacadeBase, OscillatorFacade, SawtoothTriangular, PulseWave, SuperSaw) {
		SuperOscFacade.prototype = Object.create(FacadeBase.prototype); // new FacadeBase2();
		SuperOscFacade.prototype.constructor = SuperOscFacade;

		function SuperOscFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			
			this.vanillaOsc = new OscillatorFacade(audioContext);
			this.sawtoothTriangular = new SawtoothTriangular(audioContext);
			this.pulseWave = new PulseWave(audioContext);
			this.superSaw7 = new SuperSaw(audioContext, 7);
			this.superSaw9 = new SuperSaw(audioContext, 9);
			this.superBadMfSaw = new SuperSaw(audioContext, 255);
			
			return this;
		};

		// private
		SuperOscFacade.prototype.initNodes = function() {
			this.output = this.audioContext.createGain();
		};

		// private
		SuperOscFacade.prototype.setDefaultValues = function() {
			this.output.gain.value = 0;
			this.isOn = false;
		};

		// private
		SuperOscFacade.prototype.wireUp = function() {
		};

		SuperOscFacade.prototype.setType = function(type) {
			this.sawtoothTriangular.disconnect(this.output);
			this.pulseWave.disconnect(this.output);
			this.superSaw7.disconnect(this.output);
			this.superSaw9.disconnect(this.output);
			this.superBadMfSaw.disconnect(this.output);
			this.vanillaOsc.disconnect(this.output);
			this.output.gain.value = 1;
			switch (type) {
				case 'sine':
				case 'triangle':
				case 'sawtooth':
				case 'square':
					this.vanillaOsc.connect(this.output).setType(type);
					break;
				case 'rampdown':
					this.vanillaOsc.connect(this.output).setType('sawtooth');
					this.output.gain.value = -1;
					break;
				case 'sawtooth-triangular':
					this.sawtoothTriangular.connect(this.output);
					break;
				case 'pulse':
					this.pulseWave.connect(this.output);
					break;
				case 'supersaw7':
					this.superSaw7.connect(this.output);
					break;
				case 'supersaw9':
					this.superSaw9.connect(this.output);
					break;
				case 'supersaw-swarm':
					this.superBadMfSaw.connect(this.output);
					break;
				default:
					console.warn(`todo ${type}`);
					break;
			}
			
			return this;
		};

		SuperOscFacade.prototype.setFrequency = function(frequency) {
			this.vanillaOsc.setFrequency(frequency);
			this.sawtoothTriangular.setFrequency(frequency);
			this.pulseWave.setFrequency(frequency);
			this.superSaw7.setFrequency(frequency);
			this.superSaw9.setFrequency(frequency);
			this.superBadMfSaw.setFrequency(frequency);
			return this;
		};

		SuperOscFacade.prototype.setDetune = function(semitone) {
			this.vanillaOsc.setDetune(semitone);
			this.sawtoothTriangular.setDetune(semitone);
			this.pulseWave.setDetune(semitone);
			this.superSaw7.setDetune(semitone);
			this.superSaw9.setDetune(semitone);
			this.superBadMfSaw.setDetune(semitone);
			return this;
		};
		
		SuperOscFacade.prototype.setPulseWidth = function(pw) {
			this.pulseWave.setPulseWidth(pw);
			return this;
		}

		SuperOscFacade.prototype.toggleStartStop = function() {
			if (this.isOn)
				this.stop();
			else
				this.start();
		};
		
		SuperOscFacade.prototype.start = function() {
			this.isOn = true;
			this.vanillaOsc.start();
			this.sawtoothTriangular.start();
			this.pulseWave.start();
			this.superSaw7.start();
			this.superSaw9.start();
			this.superBadMfSaw.start();
			return this;
		};

		SuperOscFacade.prototype.stop = function() {
			this.isOn = false;
			this.vanillaOsc.stop();
			this.sawtoothTriangular.stop();
			this.pulseWave.stop();
			this.superSaw7.stop();
			this.superSaw9.stop();
			this.superBadMfSaw.stop();
			return this;
		};
		
		return SuperOscFacade;
	}
);