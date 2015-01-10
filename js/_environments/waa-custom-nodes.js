
console.debug('in waa-custom-nodes');

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
	'js/ApiFacades/WaaCustomNodes/FmOscFacade.js',

	// Data (model) for custom modules
	'js/ModuleData/WaaCustomNodes/FmOscModuleFactory.js',
	
	// Controllers: responsible for binding the view and model
	// Factory for custom audio modules
	
	'_modules/waa-modular-advanced',
	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for waa-custom-nodes loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : true,
			
			title : 'Sound Generation and Modification',
			description : 'Custom nodes',
			moduleDatas : {
				rows : [
					{
						moduleCollections : [
							// Custom oscillators
							{
								controller : OscillatorController,	
								factory : FmoModuleFactory,	
								modules : [
									{ name : 'FM Oscillator 1', 			shortName : 'fmo1', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 1 } 	},
									{ name : 'FM Oscillator 2',			shortName : 'fmo2', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 2 } 	}
								]	
							},
						]
					},
					{
						moduleCollections : [
							// Custom modules
							tremoloModuleData,
							slapbackDelayModuleData,
							simpleReverbModuleData,
							filterSweepModuleData,
						]
					},
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
							channelStripModuleData
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
