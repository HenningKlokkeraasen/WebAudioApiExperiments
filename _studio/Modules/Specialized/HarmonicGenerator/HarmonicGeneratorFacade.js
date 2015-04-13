/*
	Web Audio API wrapper - HarmonicGenerator
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js'
	], function(OscillatorFacade, GainFacade) {
		HarmonicGeneratorFacade.prototype = Object.create(OscillatorFacade.prototype); // new FacadeBase2();
		HarmonicGeneratorFacade.prototype.constructor = HarmonicGeneratorFacade;

		function HarmonicGeneratorFacade(audioContext) {
			OscillatorFacade.call(this, audioContext); // base()
			
			return this;
		};

		// private
		HarmonicGeneratorFacade.prototype.initNodes = function() {
			this.output = new GainFacade(this.audioContext);
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i] = this.audioContext.createOscillator();
				this.gains[i] = this.audioContext.createGain();
			}
			// for backwards comp: this.node = this.input
			this.input = this.oscillators[0]
		};

		// private
		HarmonicGeneratorFacade.prototype.setDefaultValues = function() {
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].frequency.value = this.fundamentalFrequency * (i + 1);
				//this.oscillators[i].start(0);
				this.gains[i].gain.value = 0;
			}
			//this.amplitudeMode = this.amplitudeModes[0].value;
			//this.frequencyMode = this.frequencyModes[0].value;
			//this.stackMode = this.stackModes[0].value;
		};

		// private
		HarmonicGeneratorFacade.prototype.wireUp = function() {
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].connect(this.gains[i]);
				this.gains[i].connect(this.output.output);
			}
		};

		// override
		HarmonicGeneratorFacade.prototype.setType = function(type) {
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].type = type;
			}
			return this;
		};

		// override
		// sets the fundamental frequency to [frequency] and sets all the harmonics frequencies
		HarmonicGeneratorFacade.prototype.setFrequency = function(frequency) {
			this.fundamentalFrequency = frequency;
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].frequency.value = parseFloat(frequency) * (i + 1);
			}
			return this;
		};

		// override
		HarmonicGeneratorFacade.prototype.setDetune = function(semitone) {
			// not implemented
			return this;
		};

		// override
		HarmonicGeneratorFacade.prototype.pitchBendIsh = function(detuneValue) {
			// not implemented
			return this;
		};

		// override
		HarmonicGeneratorFacade.prototype.start = function() {
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].start(0);
			}
			return this;
		};

		// override
		HarmonicGeneratorFacade.prototype.stop = function() {
			for (var i = 0; i < this.numberOfHarmonics; i++) {
				this.oscillators[i].stop();
				// recreate
				this.oscillators[i] = this.audioContext.createOscillator();
			}
			this.wireUp();
			this.setDefaultValues();
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
			return this;
		};

		HarmonicGeneratorFacade.prototype.numberOfHarmonics = 25;
		HarmonicGeneratorFacade.prototype.fundamentalFrequency = 440;
		HarmonicGeneratorFacade.prototype.oscillators = [];
		HarmonicGeneratorFacade.prototype.gains = [];
		HarmonicGeneratorFacade.prototype.stackMode = '';
		HarmonicGeneratorFacade.prototype.amplitudeMode = '';
		HarmonicGeneratorFacade.prototype.frequencyMode = '';
		HarmonicGeneratorFacade.prototype.phaseInvertOnAll = false;
		HarmonicGeneratorFacade.prototype.phaseInvertOnEveryFourth = false;
		HarmonicGeneratorFacade.prototype.stackModes = [ 
			{ name : 'stack', value : 'stack', selected : true }, 
			{ name : 'single', value : 'single' } ];
		HarmonicGeneratorFacade.prototype.amplitudeModes = [ 
			{ name : 'constant', value : 'constant' }, 
			{ name : 'inverseOfHarmonicNumber', value : 'inverseOfHarmonicNumber', selected : true }, 
			//{ name : 'reverseA', value : 'reverseA' }, 
			{ name : 'inverseSquaredOfHarmonicNumber', value : 'inverseSquaredOfHarmonicNumber' } ];
		HarmonicGeneratorFacade.prototype.frequencyModes = [ 
			{ name : 'all', value : 'all', selected : true }, 
			{ name : 'odds', value : 'odds' }, 
			{ name : 'evens', value : 'evens' } ];

		HarmonicGeneratorFacade.prototype.setNumberOfHarmonics = function(numberOfHarmonics) {
			this.currentNumberOfHarmonics = numberOfHarmonics;
			for (var i = 0; i < numberOfHarmonics; i++) {
				// index out of range check
				if (i < this.numberOfHarmonics) {
					var harmonicNumber = i + 1;
					// Stack mode: stack
					if (this.stackMode == this.stackModes[0].value
					// Stack mode: single
					|| this.stackMode == this.stackModes[1].value && numberOfHarmonics == harmonicNumber) {
						// Frequency mode: all
						if (this.frequencyMode == this.frequencyModes[0].value
						// Frequency mode: odds
						|| this.frequencyMode == this.frequencyModes[1].value && harmonicNumber % 2 != 0
						// Frequency modes: evens
						|| this.frequencyMode == this.frequencyModes[2].value && harmonicNumber % 2 == 0) {
							this.gains[i].gain.value =
								// Amplitude mode: constant
								this.amplitudeMode == this.amplitudeModes[0].value ? 1
								// Amplitude mode: halve
								: this.amplitudeMode == this.amplitudeModes[1].value ? 1 / harmonicNumber
								// Amplitude mode: reverse
								//: this.amplitudeMode == this.amplitudeModes[2].value ? 1 / (this.numberOfHarmonics - i)
								// Amplitude mode: exponential (?)
								: this.amplitudeMode == this.amplitudeModes[2].value ? (1 / (harmonicNumber * harmonicNumber)) 
								: 0;

							// Phase invert all (for sawtooth waves)
							if (this.phaseInvertOnAll)
								this.gains[i].gain.value = this.gains[i].gain.value * -1;

							// Phase invert on every fourth (for triangle waves)
							// ...starting from zero
							// so using i instead of 
							if (this.phaseInvertOnEveryFourth && i % 4 == 0)
								this.gains[i].gain.value = this.gains[i].gain.value * -1;

							//console.log(this.gains[i].gain.value);
						}
						else {
							this.gains[i].gain.value = 0;
						}
					}
					else {
						this.gains[i].gain.value = 0;
					}
				}
				else {
					this.gains[i].gain.value = 0;
				}
			}
			// reset oscillators above numberOfHarmonics
			for (var i = numberOfHarmonics; i < this.numberOfHarmonics; i++) {
				if (i <= this.numberOfHarmonics)
					this.gains[i].gain.value = 0;
			}
		};

		HarmonicGeneratorFacade.prototype.setAmplitudeMode = function(amplitudeMode) {
			this.amplitudeMode = amplitudeMode;
			// re-generate
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
		};

		HarmonicGeneratorFacade.prototype.setFrequencyMode = function(frequencyMode) {
			this.frequencyMode = frequencyMode;
			// re-generate
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
		};

		HarmonicGeneratorFacade.prototype.setStackMode = function(stackMode) {
			this.stackMode = stackMode;
			// re-generate
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
		};

		HarmonicGeneratorFacade.prototype.setPhaseInvertOnAll = function(trueOrFalse) {
			//console.log('phase is inverted: ' + trueOrFalse);
			this.phaseInvertOnAll = trueOrFalse;
			// re-generate
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
		};

		HarmonicGeneratorFacade.prototype.setPhaseInvertOnEveryFourth = function(trueOrFalse) {
			//console.log('phase is inverted: ' + trueOrFalse);
			this.phaseInvertOnEveryFourth = trueOrFalse;
			// re-generate
			this.setNumberOfHarmonics(this.currentNumberOfHarmonics);
		};

		return HarmonicGeneratorFacade;
	}
);
