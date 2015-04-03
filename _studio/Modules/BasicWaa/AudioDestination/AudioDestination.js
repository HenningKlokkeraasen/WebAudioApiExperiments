console.debug('in AudioDestination.js');
define([
	// Facades to the Web Audio API basic nodes
	

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestinationModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for AudioDestination.js loaded');		
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);