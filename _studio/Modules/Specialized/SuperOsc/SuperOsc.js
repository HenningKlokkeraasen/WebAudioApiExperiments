define([
	
	

	// Controllers: responsible for binding the view and model
	// '/_studio/Modules/Specialized/SuperOsc/SuperOscController.js',
	// '/_studio/Modules/BasicWaa/Oscillator/OscillatorController.js',
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGeneratorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/Specialized/SuperOsc/SuperOscModuleFactory.js',

	// Data store
	'/_studio/Modules/Specialized/SuperOsc/SuperOscModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);