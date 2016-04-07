require.config({
	// Force cache invalidation
	urlArgs: "bust=" + (new Date()).getTime(),

    baseUrl: '', // === /_studio
    paths: {
    	thirdparty: '../_thirdparty',
    	// bower_components: '../bower_components',
    	WebAudioApiFacades: '../_WebAudioApiFacades',
    	BrowserApiFacades: '../_BrowserApiFacades'
    },
});

require([
		'app/app',
		'BrowserApiFacades/QueryStringFacade',
		'app/ArrayExtensions',
		'load/thirdpartylibs',
		'load/patching',
		'WebAudioApiFacades/AudioContextFacade',
	], function(App, QueryStringFacade) {
	    // console.debug('dependencies for app has loaded');

		var rackName = QueryStringFacade.prototype.getParameterByName('rackName');

		require(['racks/' + rackName], function(rack) {
			// console.debug('all js required has been loaded. app is ready to be started');
			
			$(document).ready(function() {
				var app = new App();
				app.init(rack);
			});
		}, function(err) {
			console.error('require.js error:');
			console.error(err);
		});
});