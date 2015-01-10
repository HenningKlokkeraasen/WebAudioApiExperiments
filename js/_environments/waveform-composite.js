
console.debug('in waveform-composite');

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
	
	
	// Controllers: responsible for binding the view and model
	

	// Factory for custom audio modules
	'ModuleData/WaaCustomNodes/SluttrinnModuleFactory',
	

	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for waveform-composite loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,

			title : 'Composite waveforms',
			description : 'Mix two or more waveforms',
			moduleDatas : {
				rows : [
					{
						moduleCollections : [
							// Oscillators
							{
								controller : OscillatorController,
								factory : OscillatorModuleFactory,
								modules : [
									{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
									{ name : 'Osc 2', 			shortName : 'osc2', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
									{ name : 'Osc 3', 			shortName : 'osc3', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
									{ name : 'Osc 4', 			shortName : 'osc4', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	}
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
