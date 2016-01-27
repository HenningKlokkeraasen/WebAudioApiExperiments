define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaperModuleFactory.js',

	// Data store
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaperModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);