console.debug('in Gain.js');
define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Gain/GainModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for Gain.js loaded');
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);