define([
	
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/MediaStream/MediaStreamController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/MediaStream/MediaStreamModuleFactory.js',
	], function(Controller, ModuleFactory) {
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);