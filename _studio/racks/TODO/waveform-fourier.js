
console.debug('in waveform-fourier');

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
	'ApiFacades/WaaCustomNodes/WaveTableOscFacade',
	
	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/NoiseGeneratorController',

	// Factory for custom audio modules
	'ModuleData/WaaCustomNodes/SluttrinnModuleFactory',
	'ModuleData/WaaCustomNodes/WaveTableOscModuleFactory',

	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for waveform-fourier loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,

			title : 'Fourier transforms',
			description : 'Complex math at work',
			rackData : {
				rows : [
					{
						moduleCollections : [
							// Custom modules
							{
								controller : OscillatorController,
								factory : WaveTableOscModuleFactory,
								modules : [
									{ name : 'Wave Table Osc',	shortName : 'wto1', f_params : { min : 20, 	max : 2000, val :  440, stp :  10 	}, 	w_params : { indexChecked : 0 } 	},
								]
							}
						]
					},
					{
						moduleCollections : [
							sluttrinnModuleData,
							analyserModuleData
						]
					}
				]
			}
		};
	}
);
