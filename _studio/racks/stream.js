define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js'
	], function(AudioDestination, Analyser, MediaStream) {
		return {
			title : 'Media Stream and Analyser',
			description : 'Microphone and Oscilloscope',
			rackData : {
				rows : [
					{
						moduleCollections : [
							// Media Stream
							{
								controller : MediaStream.Controller,
								factory : MediaStream.ModuleFactory,
								modules : [
									{ name : 'Microphone'																																	}
								]
							},
					
					// Output and analyse

							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : [
									{ name : 'Speakers',			shortName : 'speakers'																									}
								]
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : [
									{ name : 'Oscilloscope',		shortName : 'oscilloscope'																								}
								]
							}
						]
					},
				]
			}
		};
	}
);
