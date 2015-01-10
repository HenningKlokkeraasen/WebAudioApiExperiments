
console.debug('in mediastream');

require.config({
    shim: {
    	// Common board modules depend on module factories
    	'_modules/common-board-modules': {
    		deps: ['ModuleData/WaaCustomNodes/SluttrinnModuleFactory', 'ModuleData/WebAudioApi/AnalyserModuleFactory']
    	}
    }
});

define([
	'ApiFacades/WaaCustomNodes/SluttrinnFacade',
	'ApiFacades/WebAudioApi/StreamFacade',
	
	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/MediaStreamController',

	// Factory for custom audio modules
	'ModuleData/WaaCustomNodes/SluttrinnModuleFactory',
	'ModuleData/WebAudioApi/MediaStreamModuleFactory',

	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for mediastream loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,

			title : 'Media Stream and Analyser',
			description : 'Microphone and Oscilloscope',
			moduleDatas : {
				rows : [
					{
						moduleCollections : [
							// Media Stream
							{
								controller : MediaStreamController,
								factory : MediaStreamModuleFactory,
								modules : [
									{ name : 'Microphone'																																	}
								]
							},
						]
					},
					{
						moduleCollections : [
							// Audio Destination
							{
								controller : GenericController,
								factory : AudioDestinationModuleFactory,
								modules : [
									{ name : 'Speakers',			shortName : 'speakers'																									}
								]
							},
							analyserModuleData
						]
					}
				]
			}
		};
	}
);
