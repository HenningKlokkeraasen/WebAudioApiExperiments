define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/MediaStream/MediaStreamController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/MediaStream/MediaStreamModuleFactory.js',

	// Data store
	'/_studio/Modules/BasicWaa/MediaStream/MediaStreamModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);