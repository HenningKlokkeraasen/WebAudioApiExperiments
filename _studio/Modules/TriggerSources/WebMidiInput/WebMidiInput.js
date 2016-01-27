define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputController.js',

	// Data (model) for basic modules
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputModuleFactory.js',

	// Data store
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);