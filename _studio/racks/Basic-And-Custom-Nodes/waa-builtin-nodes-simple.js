define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	], function(AudioDestination, Oscillator, Filter, Gain, Delay, Compressor, Analyser) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in (vanilla) sound generation and modification nodes in the Web Audio API',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Filter, id: 'filter1' },
							{ moduleMother: Gain, id: 'gain0' },
							{ moduleMother: Delay, id: 'delay1' },
							{ moduleMother: Compressor, id: 'compressor1' },
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
						]
					},
					{
						modules: [
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						],
					},
				],
				patches : [
					// Main audio route
					{
						from : 'osc1',
						to : 'filter1',
						type : 'audio'
					},
					{
						from : 'filter1',
						to : 'gain0',
						type : 'audio'
					},
					{
						from : 'gain0',
						to : 'compressor1',
						type : 'audio'
					},
					{
						from : 'compressor1',
						to : 'audiodestination1',
						type : 'audio'
					},
					{
						from : 'compressor1',
						to : 'analyser1',
						type : 'audio'
					},
					{
						from : 'compressor1',
						to : 'analyser2',
						type : 'audio'
					},
				]
			}
		};
	}
);
