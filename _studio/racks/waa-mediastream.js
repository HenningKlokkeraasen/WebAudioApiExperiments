define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js'
	], function(AudioDestination, Analyser, MediaStream) {
		return {
			title : 'Media Stream and Analyser',
			description : 'This rack shows the built-in MediaStream and Analyser nodes in the Web Audio API, '
				+ 'utilized to get audio from the device microphone, and displaying audio in an oscilloscope and frequency spectrum, respectively',
			rackData : {
				rows : [
					{
						moduleCollections : [
							// Media Stream
							{
								controller : MediaStream.Controller,
								factory : MediaStream.ModuleFactory,
								modules : MediaStream.Modules
							},
					
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
			}
		};
	}
);
