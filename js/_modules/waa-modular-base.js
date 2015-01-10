
console.debug('in waa-modular-base');

define([
	// Facades to the Web Audio API basic nodes
	'ApiFacades/WebAudioApi/OscillatorFacade',
	'ApiFacades/WebAudioApi/GainFacade',
	'ApiFacades/WebAudioApi/DelayFacade',
	'ApiFacades/WebAudioApi/FilterFacade',
	'ApiFacades/WebAudioApi/ConvolverFacade',
	'ApiFacades/WebAudioApi/CompressorFacade',
	'ApiFacades/WebAudioApi/WaveShaperFacade',

	// Built on top of Web Audio API

	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/OscillatorController',

	// Data (model) for basic modules
	'ModuleData/WebAudioApi/OscillatorModuleFactory',
	'ModuleData/WebAudioApi/GainModuleFactory',
	'ModuleData/WebAudioApi/DelayModuleFactory',
	'ModuleData/WebAudioApi/FilterModuleFactory',
	'ModuleData/WebAudioApi/ConvolverModuleFactory',
	'ModuleData/WebAudioApi/CompressorModuleFactory',
	'ModuleData/WebAudioApi/WaveShaperModuleFactory',
	], function() {
		console.debug('dependencies for waa-modular-base.js loaded');
	}
);