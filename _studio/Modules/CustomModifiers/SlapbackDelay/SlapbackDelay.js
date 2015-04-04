define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/CustomModifiers/SlapbackDelay/SlapbackDelayModuleFactory.js',
	], function(Controller, ModuleFactory) {
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);