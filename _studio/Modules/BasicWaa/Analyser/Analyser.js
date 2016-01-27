define([



	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Analyser/AnalyserController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Analyser/AnalyserModuleFactory.js',

	// Data store
	'/_studio/Modules/BasicWaa/Analyser/AnalyserModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);