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

					// Audio file player

					{
						moduleCollections : [
							{
								controller : AudioFilePlayer.Controller,
								factory : AudioFilePlayer.ModuleFactory,
								modules : AudioFilePlayer.Modules.getItemsByShortName('drumpads3')
							},
						]
					},

					{
						moduleCollections : [

					// Output and analyse

							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : AudioDestination.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					},
				],
				
				patches : [
					{
						from : 'drumpads3',
						to: 'audiodestination1',
						type: 'audio'
					},
					{
						from: 'drumpads3',
						to: 'analyser1',
						type: 'audio'
					}
				]
			},
		};
	}
);
