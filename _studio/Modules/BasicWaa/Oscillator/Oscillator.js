console.debug('in Oscillator.js');
define([
	// Facades to the Web Audio API basic nodes
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',

	// Controllers: responsible for binding the view and model
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	], function(Facade, Controller, ModuleFactory) {
		console.debug('dependencies for Oscillator.js loaded');		
		return { Facade: Facade, Controller: Controller, ModuleFactory: ModuleFactory };
	}
);