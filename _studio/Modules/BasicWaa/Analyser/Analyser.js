console.debug('in Analyser.js');
define([
	// Facades to the Web Audio API basic nodes
	'/_studio/Modules/BasicWaa/Analyser/AnalyserFacade.js',

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Analyser/AnalyserController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Analyser/AnalyserModuleFactory.js',
	], function(Facade, Controller, ModuleFactory) {
		console.debug('dependencies for Analyser.js loaded');
		return { Facade: Facade, Controller: Controller, ModuleFactory: ModuleFactory };
	}
);