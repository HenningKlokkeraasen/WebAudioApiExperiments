
console.debug('in load/init.js');
console.group();

require.config({

	// Force cache invalidation
	urlArgs: "bust=v49",

    baseUrl: '/js', // relative to the html page loading this file?
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
    	'/_studio/load/browserApiFacades.js': {
    		deps: ['/_studio/load/thirdpartylibs.js']
    	},
    	'/_studio/load/waa-base.js': {
    		deps: ['/_studio/load/browserApiFacades.js']
    	},
    	
    	
    }
});

require(
	[
		'/_studio/app/app.js',
		'/_studio/load/thirdpartylibs.js', // relative to the path of this file? or the html file loading this file?
		'/_studio/load/browserApiFacades.js',
		'/_studio/load/patching.js',
		'/_studio/load/waa-base.js',
		//'/_studio/load/waa-module-base.js',
		//'/_studio/load/waa-modular-base.js'
	], 
	function(
		App) {
	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	    console.groupEnd();
	    console.debug('dependencies for app has loaded');
		// console.debug(common);


		// Get the rackName
		var rackName = QueryStringFacade.prototype.getParameterByName('rackName');
		console.debug('Rack: ' + rackName);
	    console.group();

		require(['/_studio/racks/' + rackName + '.js'], function(rack) {
			console.groupEnd();
			console.debug('rackName ' + rackName + ' has loaded');
			console.debug(rack);
			console.debug('all js required has been loaded. app is ready to be started');
			
			$(document).ready(function() {
				console.debug('jquery says document is ready');

				// Load App
				var app = new App();
				app.board = rack;
				app.init();
			});
		    
		},
	    
		// Handle error if rackName parameter is not a valid (existing) rackName
		function(err) {
			console.error('require.js error:');
			console.error(err);
		});
});
