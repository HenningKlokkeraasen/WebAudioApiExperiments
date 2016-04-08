define(['app/app'], function(App) {
	class Loader {
		// TODO use Promises or Generators instead of callbacks
		constructor() {
			this.app = new App(this);
		}

		loadWithoutRack(successCallBack) {
			var self = this;
			this.ensureDocumentReady(function() {
				self.init();
				successCallBack(self.app);
			});
		}

		loadWithRack(rackName, successCallBack, errorCallback) {
			var self = this;

			this.requireRack(rackName, function(rack) {
				// console.debug('all js required has been loaded. app is ready to be started');
				self.ensureDocumentReady(function() {
					self.init();
					successCallBack(self.app, rack);
				});
			}, function(err) {
				errorCallback(self.app, err);
			});
		}

		init() {
			this.app.init();
		}

		ensureDocumentReady(callback) {
			$(document).ready(callback);
		}

		requireRack(rackName, successCallBack, errorCallback) {
			require(['racks/' + rackName], successCallBack, errorCallback);
		}
	}
	return Loader;
})