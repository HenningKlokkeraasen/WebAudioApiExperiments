define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/AudioBuses/PatchBay/PatchBayModuleFactory.js',

	// Data store
	'/_studio/Modules/AudioBuses/PatchBay/PatchBayModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);