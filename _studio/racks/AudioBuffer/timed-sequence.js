define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayer.js'
	], function(AudioDestination, Analyser, TimedSequencePlayer) {
		return {
			title : 'Playing audio files in timed sequences',
			description : '...',
			rackData : {
				rows : [

					// TimedSequencePlayer

					{
						moduleCollections : [
							{
								controller : TimedSequencePlayer.Controller,
								factory : TimedSequencePlayer.ModuleFactory,
								modules : TimedSequencePlayer.Modules
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
				]
			},
		};
	}
);
