define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayer.js'
	], function(AudioDestination, Analyser, AudioFilePlayer) {
		return {
			title : 'Playing audio files',
			description : 'A drum pad. The first 8 drums are triggered by keys 1-8 on top row of keyboard. If in loop mode, press again to stop.',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: AudioFilePlayer, id: 'drumpads1' }
						]
					},
					{
						modules: [
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
				],
				patches : [
					{ from : 'drumpads1', to: 'audiodestination1', type: 'audio' },
					{ from: 'drumpads1', to: 'analyser1', type: 'audio' },
					{ from: 'drumpads1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
