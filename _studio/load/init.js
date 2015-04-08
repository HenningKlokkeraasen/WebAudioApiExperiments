require.config({
	// Force cache invalidation
	urlArgs: 'bust=v135',

    baseUrl: '/js', // relative to the html page loading this file?
    paths: {
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
	    // console.debug('dependencies for app has loaded');

		var rackName = QueryStringFacade.prototype.getParameterByName('rackName');

		require(['/_studio/racks/' + rackName + '.js'], function(rack) {
			// console.debug('all js required has been loaded. app is ready to be started');
			
			$(document).ready(function() {
				var app = new App();
				app.board = rack;
				app.init();
			});
		    
		},
	    
		// reqiure.js loading errors
		function(err) {
			console.error('require.js error:');
			console.error(err);
		});
});
