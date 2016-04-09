define([ 
	'load/domEnsurer',
	'load/rackLoader',
	'app/app',
	'BrowserApiWrappers/QueryStringFacade'
], function(DomEnsurer, RackLoader, App, QueryStringFacade) {
	var rackLoader = new RackLoader();
	var app = new App(rackLoader);
	class Kickstarter {
		kickstart() {
			new DomEnsurer().ensureDocumentReady()
				.then(initApp)
				.then(getRackName)
				.then(loadRack)
				.then(renderRack, logRackLoadingError);
		}
	}

	function initApp() {
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

	return Kickstarter;
});