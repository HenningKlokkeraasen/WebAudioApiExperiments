console.debug('in Delay.js');
define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Delay/DelayModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for Delay.js loaded');
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);