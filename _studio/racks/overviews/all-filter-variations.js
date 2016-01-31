define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	], function(AudioDestination, Analyser, Oscillator, Filter) {
		return {
			title : 'All filter variations',
			description : 'All filter variations',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Filter, id: 'band1' },
							{ moduleMother: Filter, id: 'shelf1' },
							{ moduleMother: Filter, id: 'peaking1' },
							{ moduleMother: Filter, id: 'allpass1' },
							{ moduleMother: Filter, id: 'filter1' },
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