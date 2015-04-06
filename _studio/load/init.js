require.config({
	// Force cache invalidation
	urlArgs: "bust=v110",

    baseUrl: '/js', // relative to the html page loading this file?
    paths: {
	    // the left side is the module ID,
	    // the right side is the path to
	    // the js file, relative to baseUrl.
	    // Also, the path should NOT include
	    // the '.js' file extension. 
	    // relative to the HTML page.
    },
});

require([
		'/_studio/app/app.js',

		'/_BrowserApiFacades/QueryStringFacade.js',

		'/_studio/app/ArrayExtensions.js',
		'/_studio/app/HamburgerMenu.js',

		'/_studio/load/thirdpartylibs.js', // relative to the path of this file? or the html file loading this file?
		'/_studio/load/patching.js',
		'/_studio/load/waa-base.js',
	], function(App, QueryStringFacade) {
	    //This function is called when the required scripts are loaded.
	    //If a script calls define(), then this function is not fired until
	    //the script's dependencies have loaded, and the named argument will hold
	    //the module value for "path/path".
	    console.debug('dependencies for app has loaded');

		// Get the rackName
		var rackName = QueryStringFacade.prototype.getParameterByName('rackName');

		require(['/_studio/racks/' + rackName + '.js'], function(rack) {
			console.debug('all js required has been loaded. app is ready to be started');
			
			$(document).ready(function() {
				// Load App
				var app = new App();
				app.board = rack;
				app.init();
			});
		    
		},
	    
		// Handle reqiure.js loading errors
		function(err) {
			console.error('require.js error:');
			console.error(err);
		});
});
