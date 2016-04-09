define([], function() {
	class RackLoader {
		loadRack(rackName) {
			var self = this;
			return new Promise(function(resolve, reject) {
				self.requireRack(rackName).then(function(rack) {
					// console.debug('all js required has been loaded. app is ready to be started');
					resolve(rack);
				}, function(err) {
					reject(err);
				});
			});
		}

		requireRack(rackName) {
			return new Promise(function(resolve, reject) {
				require(['racks/' + rackName], resolve, reject);
			});
		}
	}
	return RackLoader;
})