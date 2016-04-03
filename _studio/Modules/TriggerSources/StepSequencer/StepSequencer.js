define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGeneratorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencerModuleFactory.js',

	// Data store
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencerModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);