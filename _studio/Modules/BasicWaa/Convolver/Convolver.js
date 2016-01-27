define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_AudioFileLoadingModuleController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Convolver/ConvolverModuleFactory.js',

	// Data store
	'/_studio/Modules/BasicWaa/Convolver/ConvolverModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);