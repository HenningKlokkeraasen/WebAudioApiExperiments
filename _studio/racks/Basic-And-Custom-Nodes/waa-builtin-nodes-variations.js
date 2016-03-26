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
			description : 'This rack shows variations of the basic built-in (vanilla) sound generation and modification nodes in the Web Audio API'
				,
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Oscillator, id: 'osc4' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Filter, id: 'band1' },
							{ moduleMother: Filter, id: 'shelf1' },
							{ moduleMother: Filter, id: 'peaking1' },
							{ moduleMother: Filter, id: 'allpass1' },
						]
					},
					{
						modules: [
							{ moduleMother: Gain, id: 'gain1' },
							{ moduleMother: Gain, id: 'gain2' },
							{ moduleMother: Gain, id: 'gain3' },
							{ moduleMother: Gain, id: 'gain4' },
						]
					}
				]
			}
		};
	}
);