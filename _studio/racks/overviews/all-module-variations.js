define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain) {
		return {
			title : 'All module variations',
			description : 'All module variations',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Oscillator, id: 'osc5' },
						]
					},
					{
						modules: [
							{ moduleMother: Filter, id: 'filter1' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Filter, id: 'band1' },
							{ moduleMother: Filter, id: 'shelf1' },
							{ moduleMother: Filter, id: 'peaking1' },
							{ moduleMother: Filter, id: 'allpass1' },
							{ moduleMother: Filter, id: 'resonantvcf1' },
						]
					},
					{
						modules: [
							{ moduleMother: Gain, id: 'gain0' },
							{ moduleMother: Gain, id: 'gain6' },
							{ moduleMother: Gain, id: 'gain1' },
							{ moduleMother: Gain, id: 'gain2' },
							{ moduleMother: Gain, id: 'gain3' },
							{ moduleMother: Gain, id: 'gain4' },
							{ moduleMother: Gain, id: 'gain5' },
						]
					},
					{
						modules: [
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