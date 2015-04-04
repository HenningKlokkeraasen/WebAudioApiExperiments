
console.debug('in kbd-triggered-synth');

require.config({
    shim: {
    	// Common board modules depend on module factories
    	'_modules/common-board-modules': {
    		deps: ['_modules/waa-modular-advanced', 'ModuleData/WebAudioApi/AnalyserModuleFactory']
    	}
    }
});

define([

	// Facades to the custom nodes
	'js/ApiFacades/WaaCustomNodes/VcoFacade.js',
	'js/ApiFacades/WaaCustomNodes/VcaFacade.js',
	'js/ApiFacades/WaaCustomNodes/VoiceFacade.js',
	'js/ApiFacades/WaaCustomNodes/FmVoiceFacade.js',

	// Built on top of Web Audio API
	'js/ApiFacades/Other/Synthesizer.js',

	// Controllers: responsible for binding the view and model
	'js/Controllers/WebAudioApi/GearController.js',
	'js/Controllers/Other/KeyboardController.js',

	// Factory for custom audio modules
	'js/ModuleData/WaaCustomNodes/FmOscModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/VoiceModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/FmVoiceModuleFactory.js',
	
	// 
	'_modules/waa-modular-advanced',
	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for kbd-triggered-synth loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : true,
			usesSynthAndKeyboard : true,
			title : 'Sound Generation and Modification',
			description : 'Sound triggered by keyboard',
			rackData : {
				gear : [
					{
						gearName : 'Synth',
						moduleCollections : [
							// Custom oscillators
							{
								controller : GenericController,
								factory : VoiceModuleFactory,	
								modules : [
									{ name : 'Sound 1', 	shortName : 'sound1', 																 	w_params : { indexChecked : 0 } },
									{ name : 'Sound 2', 	shortName : 'sound2', moduleSettings : { hasModulator : true },						 	w_params : { indexChecked : 0 } },
									//{ name : 'Voice 3', 	shortName : 'voice3', moduleSettings : { hasFilter : true },						 	w_params : { indexChecked : 2 } },
									//{ name : 'Voice 4', 	shortName : 'voice4', moduleSettings : { hasFilter : true, hasModulator : true },	 	w_params : { indexChecked : 3 } },
								]	
							},
						]
					},
					{
						gearName : 'Effects',
						moduleCollections : [
							// Custom modules
							slapbackDelayModuleData,
							simpleReverbModuleData,
							tremoloModuleData,
							filterSweepModuleData,
						]
					},
					{
						gearName : 'Mixer',
						moduleCollections : [
							channelStripModuleData
						]
					}
				],
				rows : [
					{
						moduleCollections : [
							// Modifiers
							{
								controller : GenericController,
								factory : FilterModuleFactory,
								modules : [
								    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	},
								    { name : 'Filter 2',		shortName : 'filter2',																	t_params : { indexChecked : 1 } 	}
								]	
							},
						]
					},
					{
						moduleCollections : [
							convolverModuleData,
							distortionModuleData
						]
					},
					{
						moduleCollections : [
							sluttrinnModuleData,
							analyserModuleData
						]
					},
				]
			}
		};
	}
);
