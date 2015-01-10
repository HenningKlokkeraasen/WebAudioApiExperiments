
console.debug('in waa-modular-advanced');

define([
	// NOTE requirejs Paths are relative to ???

	// Facades to the custom nodes
	'js/ApiFacades/WaaCustomNodes/SlapbackDelayFacade.js',
	'js/ApiFacades/WaaCustomNodes/SimpleReverbFacade.js',
	'js/ApiFacades/WaaCustomNodes/MixerFacade.js',
	'js/ApiFacades/WaaCustomNodes/FilterSweepFacade.js',
	'js/ApiFacades/WaaCustomNodes/TremoloFacade.js',

	'js/ApiFacades/WaaCustomNodes/SluttrinnFacade.js',

	// Facades to the custom AudioParam modifiers
	'js/ApiFacades/WaaCustomModifiers/EnvelopeGeneratorFacade.js',
	'js/ApiFacades/WaaCustomModifiers/LfoFacade.js',

	// Data (model) for custom modules
	'js/ModuleData/WaaCustomNodes/SlapbackDelayModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/SimpleReverbModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/MixerModule.js',
	'js/ModuleData/WaaCustomNodes/FilterSweepModuleFactory.js',
	'js/ModuleData/WaaCustomNodes/TremoloModuleFactory.js',

	// Data (model) for custom AudioParam modifiers
	'js/ModuleData/WaaCustomModifiers/EnvelopeGeneratorModule.js',

	// Factory for custom audio modules
	'js/ModuleData/WaaCustomNodes/SluttrinnModuleFactory.js',
	], function() {
		console.debug('dependencies for waa-modular-advanced.js loaded');
});