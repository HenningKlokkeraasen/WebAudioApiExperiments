define([
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	], function(Gain, Compressor, AudioDestination) {
		return {
			id: 'finalStage1',
			title : 'Final Stage',
			description : 'This is a set of three modules that together combine the final stage.',//TODO this is not rendered anywhere
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Gain, id: 'gain6' },
							{ moduleMother: Compressor, id: 'compressor1' },
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
						]
					}
				],
				patches : [
					{ from: 'gain6', to: 'compressor1', type: 'audio' },
					{ from: 'compressor1', to: 'audiodestination1', type: 'audio' }
				]
			}
		};
	}
);