define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/Specialized/WaveTableOsc/WaveTableOscModuleFactory.js',

	// Data store
	'/_studio/Modules/Specialized/WaveTableOsc/WaveTableOscModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);