
/*


	Settings and modules for media stream


*/
 
App.prototype.shouldLoadImpulseBuffers = false;

App.prototype.moduleDatas = [
	// Audio Destination
	{
		controller : GenericController,
		factory : AudioDestinationModuleFactory,
		modules : [
			{ name : 'Speakers',			shortName : 'speakers'																									}
		]
	},

	// Media Stream
	{
		controller : MediaStreamController,
		factory : MediaStreamModuleFactory,
		modules : [
			{ name : 'Microphone'																																	}
		]
	},
];

App.prototype.moduleDatas.push(analyserModuleData);
