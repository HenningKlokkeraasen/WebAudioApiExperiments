
console.debug('in patching.js');

define([
	'/_Patching/Patcher.js',

	// Controllers: responsible for binding the view and model
	'/_Patching/Controllers/PatchController.js',
	'/_Patching/Controllers/PatchCableController.js',
	], function() {
		console.debug('dependencies for patching.js loaded');
	}
);