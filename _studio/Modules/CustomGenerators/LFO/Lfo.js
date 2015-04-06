define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/CustomGenerators/LFO/LfoModuleFactory.js',

	// Data store
	'/_studio/Modules/CustomGenerators/LFO/LfoModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);