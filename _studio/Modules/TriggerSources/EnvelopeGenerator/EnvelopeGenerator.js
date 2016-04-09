define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGeneratorModuleFactory.js',

	// Data store
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGeneratorModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);