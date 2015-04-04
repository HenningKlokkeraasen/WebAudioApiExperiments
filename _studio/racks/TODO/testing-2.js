
console.debug('in testing-2');

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
	// 'js/ApiFacades/WaaCustomNodes/FmVoiceFacade.js',

	// Built on top of Web Audio API
	'js/ApiFacades/Other/Synthesizer.js',

	// Controllers: responsible for binding the view and model
	'js/Controllers/WebAudioApi/GearController.js',
	'js/Controllers/Other/KeyboardController.js',

	// Factory for custom audio modules
	'js/ModuleData/WaaCustomNodes/FmOscModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/VoiceModuleFactory.js',
	// 'js/ModuleData/WaaCustomNodes/FmVoiceModuleFactory.js',
	
	// 
	'_modules/waa-modular-advanced',
	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for testing-2 loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,
			usesSynthAndKeyboard : true,
			title : 'Testing Grounds 2',
			description : 'Newest modules..',
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
									{ name : 'Voice 1', 	shortName : 'voice1', 																 	w_params : { indexChecked : 0 } },
									{ name : 'Voice 2', 	shortName : 'voice2', moduleSettings : { hasModulator : true },						 	w_params : { indexChecked : 1 } },
									{ name : 'Voice 3', 	shortName : 'voice3', moduleSettings : { hasFilter : true },						 	w_params : { indexChecked : 2 } },
									{ name : 'Voice 4', 	shortName : 'voice4', moduleSettings : { hasFilter : true, hasModulator : true },	 	w_params : { indexChecked : 3 } },
								]	
							},
						]
					}
				],
				rows : [
					{
						moduleCollections : [
							{
								controller : GenericController,
								factory : GainModuleFactory,
								modules : [
									{ name : 'gain 1', 		shortName : 'gain1', 	g_params : { min :  0,	max : 1,	val:  1,	stp : 0.1 	} 										},
									{ name : 'gain 2', 		shortName : 'gain2', 	g_params : { min :  0,	max : 1,	val:  1,	stp : 0.1 	} 										},
									{ name : 'gain 3', 		shortName : 'gain3', 	g_params : { min :  0,	max : 1,	val:  1,	stp : 0.1 	} 										},
									{ name : 'gain 4', 		shortName : 'gain4', 	g_params : { min :  0,	max : 1,	val:  1,	stp : 0.1 	} 										},
								]
							},
						]
					},
					{
						moduleCollections : [
							sluttrinnModuleData,
							analyserModuleData,
						]
					}
				]
			}
		};
	}
);
