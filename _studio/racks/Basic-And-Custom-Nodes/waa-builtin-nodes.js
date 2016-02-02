define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in sound generation and modification nodes in the Web Audio API - with more modules for more sound and patch possibilities.'
				+ ' You can e.g. run three oscillators with the same wave type and frequencey, but two of them slightly detuned in opposite directions. '
				+ ' Or two square waves with one slightly detuned to get pulse width modulation',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Oscillator, id: 'osc2' },
							{ moduleMother: Oscillator, id: 'osc3' },
							{ moduleMother: Oscillator, id: 'osc4' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Filter, id: 'band1' },
							{ moduleMother: Filter, id: 'shelf1' },
							{ moduleMother: Filter, id: 'peaking1' },
						]
					},
					{
						modules: [
							{ moduleMother: Gain, id: 'gain1' },
							{ moduleMother: Gain, id: 'gain2' },
							{ moduleMother: Gain, id: 'gain3' },
							{ moduleMother: Gain, id: 'gain4' },
							{ moduleMother: Delay, id: 'delay1' },
							{ moduleMother: Delay, id: 'delay2' },
							{ moduleMother: Delay, id: 'delay3' },
							{ moduleMother: Delay, id: 'delay4' },
						]
					},
					{
						modules: [
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: Compressor, id: 'compressor1' },
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
				]
			}
		};
	}
);