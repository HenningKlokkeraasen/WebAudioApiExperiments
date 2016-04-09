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
	'app/domEnsurer',
	'app/rackLoader',
	'app/app',
	'BrowserApiWrappers/QueryStringFacade',
	'app/ArrayExtensions',
	'load/patching',
	'WaapiWrappers/AudioContextFacade',
], function(thirdpartylibs, DomEnsurer, RackLoader, App, QueryStringFacade) {
	// console.debug('dependencies for app has loaded');
	var rackLoader = new RackLoader();
	var app = new App(rackLoader);
	new DomEnsurer().ensureDocumentReady().then(init);

	function init() {
		app.init();
		loadRack();
	}

	function loadRack() {
		var rackName = new QueryStringFacade().getParameterByName('rackName');
		if (rackName)
			rackLoader.loadRack(rackName).then(renderRack, logRackLoadingError);
	}

	function renderRack(rack) {
		app.renderRack(rack);
	}

	function logRackLoadingError(err) {
		console.error('require.js error: could not load rack');
		console.error(err);
	}
});