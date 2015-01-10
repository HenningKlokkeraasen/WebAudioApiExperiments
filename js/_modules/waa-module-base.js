
console.debug('in waa-module-base');

define([
	// Built on top of Web Audio API
	'Global/Patcher',

	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/_ButtonTriggeredModuleController',

	'Controllers/Other/PatchController',
	'Controllers/Other/PatchCableController',

	// Data (model) for modules
	'ModuleData/WebAudioApi/AudioDestinationModuleFactory',
	], function() {
		console.debug('dependencies for waa-module-base.js loaded');
	}
);