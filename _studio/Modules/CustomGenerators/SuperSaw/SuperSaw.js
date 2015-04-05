define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/CustomGenerators/NoiseGenerator/NoiseGeneratorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/CustomGenerators/SuperSaw/SuperSawModuleFactory.js',

	// Data store
	'/_studio/Modules/CustomGenerators/SuperSaw/SuperSawModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);