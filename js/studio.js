
console.debug('in app.js');
console.group();

require.config({
    baseUrl: 'js', // relative to the html page loading this file?
    paths: {
	    // the left side is the module ID,
	    // the right side is the path to
	    // the jQuery file, relative to baseUrl.
	    // Also, the path should NOT include
	    // the '.js' file extension. This example
	    // is using jQuery 1.9.0 located at
	    // js/lib/jquery-1.9.0.js, relative to
	    // the HTML page.
        // vendor: 'vendor',
        // facades: 'ApiFacades'
    },
    // set dependencies for loading in order
    shim: {
    	'_modules/waa-base': {
    		deps: ['_modules/common']
    	},
    	'_modules/waa-module-base': {
    		deps: ['_modules/waa-base']
    	},
    	'_modules/waa-modular-base': {
    		deps: ['_modules/waa-module-base']
    	}
    }
});

require(
	[
		'_modules/common', // relative to the path of this file? or the html file loading this file?
		'_modules/waa-base',
		'_modules/waa-module-base',
		'_modules/waa-modular-base'
	], 
	function(
		common) {
	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	    console.groupEnd();
	    console.debug('dependencies for app has loaded');
		// console.debug(common);


		// Get the Environment
		var environment = QueryStringFacade.prototype.getParameterByName('environment');
		console.debug('Environment: ' + environment);
	    console.group();

		require(['_environments/' + environment], function() {
			console.groupEnd();
			console.debug('environment ' + environment + ' has loaded');
			console.debug('all js required has been loaded. app is ready to be started');
			
			$(document).ready(function() {
				console.debug('jquery says document is ready');

				// Load App
				new App().init();
			});
		    
		},
	    
		// Handle error if environment parameter is not a valid (existing) environment
		function(err) {
			console.error('require.js error:');
			console.error(err);
		});
});
