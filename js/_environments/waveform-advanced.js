
console.debug('in waveform-noisegen');

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
	'ApiFacades/WaaCustomNodes/NoiseGeneratorFacade',
	'ApiFacades/WaaCustomNodes/PulseWaveFacade',
	'ApiFacades/WaaCustomNodes/SuperSawFacade',
	
	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/NoiseGeneratorController',

	// Factory for custom audio modules
	'ModuleData/WaaCustomNodes/SluttrinnModuleFactory',
	'ModuleData/WaaCustomNodes/NoiseGeneratorModuleFactory',
	'ModuleData/WaaCustomNodes/PulseWaveModuleFactory',
	'ModuleData/WaaCustomNodes/SuperSawModuleFactory',

	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for waveform-noisegen loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,

			title : 'Advanced wave forms',
			description : 'Lorem ipsum',
			moduleDatas : {
				rows : [
					{
						moduleCollections : [
							// Custom modules
							{
								controller : NoiseGeneratorController,
								factory : NoiseGeneratorModuleFactory,
								modules : [
									{ name : 'Noise Generator',	shortName : 'ng1', 																										},
								]
							},
							{
								controller : NoiseGeneratorController,
								factory : PulseWaveModuleFactory,
								modules : [
									{ name : 'Pulse Wave',	shortName : 'pw1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 }		}
								]
							},
							{
								controller : NoiseGeneratorController,
								factory : SuperSawModuleFactory,
								modules : [
									{ name : 'Super Saw',	shortName : 's1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 }		}
								]
							},
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
