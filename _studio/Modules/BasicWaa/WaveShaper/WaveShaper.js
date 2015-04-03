console.debug('in WaveShaper.js');
define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/_GenericController.js',

	// Data (model) for basic modules
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaperModuleFactory.js',
	], function(Controller, ModuleFactory) {
		console.debug('dependencies for WaveShaper.js loaded');
		return { Controller: Controller, ModuleFactory: ModuleFactory };
	}
);