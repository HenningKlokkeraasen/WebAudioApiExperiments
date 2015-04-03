console.debug('in Filter.js');
define([
	// Facades to the Web Audio API basic nodes
	'/_studio/Modules/BasicWaa/Filter/FilterFacade.js',

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Filter/FilterModuleFactory.js',
	], function(Facade, Controller, ModuleFactory) {
		console.debug('dependencies for Filter.js loaded');
		return { Facade: Facade, Controller: Controller, ModuleFactory: ModuleFactory };
	}
);