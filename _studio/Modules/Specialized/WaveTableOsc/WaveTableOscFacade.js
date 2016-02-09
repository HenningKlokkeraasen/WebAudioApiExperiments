/*
	Web Audio API wrapper - WaveTableOsc
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
	'/_studio/Modules/Specialized/WaveTableOsc/PeriodicWaveCreator.js'
	], function(OscillatorFacade, PeriodicWaveCreator) {
		WaveTableOscFacade.prototype = Object.create(OscillatorFacade.prototype); // new FacadeBase2();
		WaveTableOscFacade.prototype.constructor = WaveTableOscFacade;

		function WaveTableOscFacade(audioContext) {
			OscillatorFacade.call(this, audioContext); // base()
			this.periodicWaveCreator = new PeriodicWaveCreator(audioContext);
			return this;
		};

		// inherit initNodes()

		// private
		WaveTableOscFacade.prototype.setDefaultValues = function() {
			// this.input.start(0);
			this.output.gain.value = 0;
			// this.input.type = 'custom';
		};

		// inherit wireUpt()

		WaveTableOscFacade.prototype.periodicWaves = [ 
			{ name : 'sine', 		value : 'sine', 	selected : true }, 
			{ name : 'triangle', 	value : 'triangle' 					}, 
			{ name : 'sawtooth', 	value : 'sawtooth' 					}, 
			{ name : 'square', 		value : 'square' 					},
			{ name: 'Organ_2', value: 'Organ_2' },
			{ name: 'Organ_3', value: 'Organ_3' },
			{ name: '11_TB303_Square', value: '11_TB303_Square' },
			{ name: 'Buzzy_1', value: 'Buzzy_1' },
			{ name: 'DissonantPiano', value: 'DissonantPiano' },
			{ name: 'Harsh', value: 'Harsh' },
			{ name: 'Phoneme_ee', value: 'Phoneme_ee' },
			{ name: 'Piano', value: 'Piano' },
			{ name: 'Trombone', value: 'Trombone' },
			{ name: 'Celeste', value: 'Celeste' },
			{ name: 'Chorus_Strings', value: 'Chorus_Strings' },
			{ name: 'Ethnic_33', value: 'Ethnic_33' },
			{ name: 'Full_1', value: 'Full_1' },
			{ name: 'Mkl_Hard', value: 'Mkl_Hard' },
			{ name: 'Throaty', value: 'Throaty' },
			{ name: 'Wurlitzer', value: 'Wurlitzer' },
			{ name: 'Wurlitzer_2', value: 'Wurlitzer_2' }
		];

		WaveTableOscFacade.prototype.setPeriodicWave = function(periodicWave) {
			switch (periodicWave) {
				case this.periodicWaves[0].value:
					this.input.setPeriodicWave(this.periodicWaveCreator.createSineWave());
					break;
				case this.periodicWaves[1].value:
					this.input.setPeriodicWave(this.periodicWaveCreator.createTriangleWave());
					break;
				case this.periodicWaves[2].value:
					this.input.setPeriodicWave(this.periodicWaveCreator.createSawtoothWave());
					break;
				case this.periodicWaves[3].value:
					this.input.setPeriodicWave(this.periodicWaveCreator.createSquareWave());
					break;
				case this.periodicWaves[4].value:
				case this.periodicWaves[5].value:
				case this.periodicWaves[6].value:
				case this.periodicWaves[7].value:
				case this.periodicWaves[8].value:
				case this.periodicWaves[9].value:
				case this.periodicWaves[10].value:
				case this.periodicWaves[11].value:
				case this.periodicWaves[12].value:
				case this.periodicWaves[13].value:
				case this.periodicWaves[14].value:
				case this.periodicWaves[15].value:
				case this.periodicWaves[16].value:
				case this.periodicWaves[17].value:
				case this.periodicWaves[18].value:
				case this.periodicWaves[19].value:
				case this.periodicWaves[20].value:
					var self = this;
					this.periodicWaveCreator.createChromiumWave(periodicWave, function(wave) {
						self.input.setPeriodicWave(wave);
					});
					break;
				default:
					console.warn('WaveTableOscFacade.setPeriodicWave: undefined periodicWave ' + periodicWave);
					break;
			}
			return this;
		};

		return WaveTableOscFacade;
	}
);
