define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSectionModuleFactory.js',

	// Data store
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSectionModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);