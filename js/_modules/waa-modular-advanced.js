
console.debug('in waa-modular-advanced');

define([
	// Facades to the custom AudioParam modifiers
	'js/ApiFacades/WaaCustomModifiers/EnvelopeGeneratorFacade.js',
	'js/ApiFacades/WaaCustomModifiers/LfoFacade.js',

	// Data (model) for custom AudioParam modifiers
	'js/ModuleData/WaaCustomModifiers/EnvelopeGeneratorModule.js',
	], function() {
		console.debug('dependencies for waa-modular-advanced.js loaded');
});