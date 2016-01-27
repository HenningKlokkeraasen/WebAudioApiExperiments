define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancockController.js',

	// Data (model) for basic modules
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancockModuleFactory.js',

	// Data store
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancockModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);