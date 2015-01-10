
console.debug('in common.js');

define([
	// 3rd party libraries
	'vendor/jquery-2.1.1',
    'vendor/handlebars-v1.3.0',

    // Facades to browser APIs
    'ApiFacades/Browser/XhrFacade',
    'ApiFacades/Browser/UserMediaFacade',
	'ApiFacades/Browser/CanvasFacade',
	'ApiFacades/Browser/SessionStorageFacade',
	'ApiFacades/Browser/QueryStringFacade'],
	function(
		jquery,
		handlebars,
		xhrFacade,
		userMediaFacade,
		canvasFacade,
		sessionStorageFacade,
		queryStringFacade
		) {
	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	    console.debug('dependencies for common.js has loaded');
	}
);
