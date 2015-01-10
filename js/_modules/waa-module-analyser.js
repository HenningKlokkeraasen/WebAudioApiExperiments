
console.debug('in waa-module-analyser');

define([
	// Facades to the Web Audio API basic nodes
	'ApiFacades/WebAudioApi/AnalyserFacade',

	// Built on top of Web Audio API
	'ApiFacades/Other/Oscilloscope',
	'ApiFacades/Other/FrequencySpectrumAnalyser',

	// Controllers: responsible for binding the view and model
	'Controllers/WebAudioApi/AnalyserController',
	
	// Data (model) for modules
	'ModuleData/WebAudioApi/AnalyserModuleFactory',
	], function() {
		console.debug('dependencies for waa-module-analyser.js loaded');
	}
);