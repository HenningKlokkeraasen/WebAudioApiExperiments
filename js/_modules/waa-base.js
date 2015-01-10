
console.debug('in waa-base.js');

define([
	// Facades to the Web Audio API
	'ApiFacades/WebAudioApi/_FacadeBase',
	'ApiFacades/WebAudioApi/AudioContextFacade',
	'ApiFacades/WebAudioApi/BufferFacade',

	// Controllers: responsible for binding the view and model
	'Controllers/LayoutController',
	'Controllers/_TemplateLoader',

	'Controllers/WebAudioApi/_GenericController',

	// Data (model) for modules
	'ModuleData/_ModuleFactoryBase',

	// The app
	'app/app'
	], function() {
		console.debug('dependencies for waa-base.js loaded');
	}
);