console.debug('in Convolver.js');
define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Convolver/ConvolverController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Convolver/ConvolverModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for Convolver.js loaded');
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);