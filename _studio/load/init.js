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
	'load/domEnsurer',
	'load/rackLoader',
	'app/app',
	'BrowserApiWrappers/QueryStringFacade',
	'app/ArrayExtensions',
	'load/patching',
	'WaapiWrappers/AudioContextFacade',
], function(thirdpartylibs, DomEnsurer, RackLoader, App, QueryStringFacade) {
	// console.debug('dependencies for app has loaded');
	var rackLoader = new RackLoader();
	var app = new App(rackLoader);
	new DomEnsurer().ensureDocumentReady()
		.then(init)
		.then(getRackName)
		.then(loadRack)
		.then(renderRack, logRackLoadingError);

	function init() {
		app.init();
	}

	function getRackName() {
		return new QueryStringFacade().getParameterByName('rackName');
	}

	function loadRack(rackName) {
		return new Promise(function(resolve, reject) {
			if (rackName)
				rackLoader.loadRack(rackName).then(resolve, reject);
			else
				reject(Error('no rack name'));
		});
	}

	function renderRack(rack) {
		app.renderRack(rack);
	}

	function logRackLoadingError(err) {
		console.error('require.js error: could not load rack');
		console.error(err);
	}
});