console.debug('in Compressor.js');
define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Compressor/CompressorModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for Compressor.js loaded');
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);