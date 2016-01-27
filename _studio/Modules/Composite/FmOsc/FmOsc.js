define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/Composite/FmOsc/FmOscModuleFactory.js',

	// Data store
	'/_studio/Modules/Composite/FmOsc/FmOscModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);