define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGeneratorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGeneratorModuleFactory.js',

	// Data store
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGeneratorModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);