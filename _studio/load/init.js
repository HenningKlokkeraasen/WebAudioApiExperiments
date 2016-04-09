require.config({
	// Force cache invalidation
	urlArgs: "bust=" + (new Date()).getTime(),

	baseUrl: '', // === /_studio
	paths: {
		thirdparty: '../_thirdparty',
		// bower_components: '../bower_components',
	},
});

require([ 
	'load/thirdpartylibs',
	'load/kickstarter',
	'app/ArrayExtensions',
	'load/patching',
	'WaapiWrappers/AudioContextFacade',
], function(thirdpartylibs, Kickstarter) {
	// console.debug('dependencies for app has loaded');
	new Kickstarter().kickstart();
});