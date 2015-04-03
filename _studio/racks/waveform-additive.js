
console.debug('in waveform-additive');

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
	'ApiFacades/WaaCustomNodes/HarmonicGeneratorFacade',
	
	// Controllers: responsible for binding the view and model
	

	// Factory for custom audio modules
	'ModuleData/WaaCustomNodes/SluttrinnModuleFactory',
	'ModuleData/WaaCustomNodes/HarmonicGeneratorModuleFactory',

	'_modules/waa-module-analyser',

	// Common board modules
	'_modules/common-board-modules'
	], function() {
		console.debug('dependencies for waveform-additive loaded');

		App.prototype.board = {
			shouldLoadImpulseBuffers : false,

			title : 'Additive synthesis',
			description : 'Add harmonics to a single sine wave, in various algorithms, results in sawtooth, square and triangle waves',
			rackData : {
				rows : [
					{
						moduleCollections : [
							// Custom modules
							{
								controller : OscillatorController,
								factory : HarmonicGeneratorModuleFactory,
								modules : [
									{ name : 'Harmonic Generator',	shortName : 'harmgen1', f_params : { min : 20, 	max : 2000, val :  440, stp :  10 	}, 	w_params : { indexChecked : 0 } 	},
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
