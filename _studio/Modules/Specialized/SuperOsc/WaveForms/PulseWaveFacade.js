/*
	Web Audio API wrapper - oscillator
	http://stackoverflow.com/questions/19178908/how-to-modulate-the-pulsewidth-of-the-web-audio-api-square-oscillatornode
	http://webaudiodemos.appspot.com/oscilloscope/index.html
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
	'/_studio/Modules/BasicWaa/Gain/GainFacade.js'
	], function(OscillatorFacade, GainFacade) {
		PulseWaveFacade.prototype = Object.create(OscillatorFacade.prototype); // new FacadeBase2();
		PulseWaveFacade.prototype.constructor = PulseWaveFacade;

		function PulseWaveFacade(audioContext) {
			OscillatorFacade.call(this, audioContext); // base()
			// FacadeBase2.call(this, audioContext); // ??
			this.hasBeenStartedOnce = false;
			return this;
		};

		// private
		PulseWaveFacade.prototype.initNodes = function() {
			// The pulse wave will be simulated using two oscillators 
			// set to sawtooth wave
			this.saw1 = this.audioContext.createOscillator();
			this.saw2 = this.audioContext.createOscillator();
			// with one of them phase inverted
			this.inverter = this.audioContext.createGain();
			// and delayed by the period of the main osc (1/F)
			this.dutyCycle = this.audioContext.createDelay();
			// and offset (otherwise the wave would jump up and down when modifiying the width)
			this.dcOffset = this.createDCOffset();
			this.dcGain = this.audioContext.createGain();
			// output
			this.output = this.audioContext.createGain();
		};

		// private
		PulseWaveFacade.prototype.setDefaultValues = function() {
			this.saw1.type = 'sawtooth';
			this.saw2.type = 'sawtooth';
			this.saw1.start(0);
			this.saw2.start(0);
			this.inverter.gain.value = -1;
			this.dutyCycle.delayTime.value = (1 / 440);
			this.output.gain.value = 0;
		};

		// private
		PulseWaveFacade.prototype.wireUp = function() {
			this.saw1.connect(this.output);

			this.saw2.connect(this.inverter);
			this.inverter.connect(this.dutyCycle);
			this.dutyCycle.connect(this.output);

			this.dcOffset.connect(this.dcGain);
			this.dcGain.connect(this.output);
		};

		PulseWaveFacade.prototype.setType = function(type) {
			// not applicable
			return this;
		};

		PulseWaveFacade.prototype.setFrequency = function(frequency) {
			this.saw1.frequency.value = parseFloat(frequency);
			this.saw2.frequency.value = parseFloat(frequency);
			this.setPulseWidth(this.currentPercentage);
			return this;
		};

		PulseWaveFacade.prototype.setDetune = function(semitone) {
			this.saw1.detune.value = parseFloat(semitone) * 100;
			this.saw2.detune.value = parseFloat(semitone) * 100;
			return this;
		};

		PulseWaveFacade.prototype.pitchBendIsh = function(detuneValue) {
			this.saw1.detune.value = this.input.detune.value + parseFloat(detuneValue)*10;
			this.saw2.detune.value = this.input.detune.value + parseFloat(detuneValue)*10;
			return this;
		};

		PulseWaveFacade.prototype.setPulseWidth = function(percentage) {
			if (percentage === undefined)
				return;
			var min = 0;
			var max = 1 / this.saw1.frequency.value; // period of the wave
			var pw = max / 100 * parseInt(percentage);
			
			this.dutyCycle.delayTime.value = pw;
			// console.debug(percentage);
			// console.debug(max);
			// console.debug(pw);

			this.dcGain.gain.value = 1.7 * (0.5 - (percentage / 100)); // some formula, dont know what it does, see link above

			this.currentPercentage = percentage;

			return this;
		};


		PulseWaveFacade.prototype.createDCOffset = function() {
			var buffer = this.audioContext.createBuffer(1, 1024, this.audioContext.sampleRate);
			var data = buffer.getChannelData(0);
			for (var i = 0; i < 1024; i++)
				data[i] = 1.0;
			var bufferSource = this.audioContext.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.loop = true;
			return bufferSource;
		};

		PulseWaveFacade.prototype.start = function() {
			this.output.gain.value = 1;
			if (!this.hasBeenStartedOnce) {
				this.dcOffset.start();
				this.hasBeenStartedOnce = true;
			}
			return this;
		};

		PulseWaveFacade.prototype.stop = function() {
			this.output.gain.value = 0;
			return this;
		};

		return PulseWaveFacade;
	}
);
