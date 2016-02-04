define([], function() {
	var iCanTrigger = function() {

		this.facadesToTrigger = [];//aka triggerDestinations
		// this.gateOnCallback = undefined;
		// this.gateOffCallback = undefined;

		this.setTriggerFor = function(destination) {
			// if (destination instanceof iCanBeTriggered) {
				// set trigger
				this.facadesToTrigger.push(destination);
			// } else {
			// 	console.group();
			// 	console.warn('destination is not a Facade. destination is:');
			// 	console.warn(destination);
			// 	console.warn('this is a/an');
			// 	console.warn(this);
			// 	console.groupEnd();
			// }
				
			// TODO implement untrigger
			return 1;
		};

		this.unsetTriggerFor = function() {
			// not implemented TODO
		};

		this.trigger = function() {
			var self = this;
			this.facadesToTrigger.forEach(function(facade) {
				// console.debug('calling gateOn for ')
				// console.debug(facade);
				// console.debug(self.gateOnCallback);
				facade.gateOn(self.gateOnCallback, self);
			});
		};

		this.release = function() {
			var self = this;
			this.facadesToTrigger.forEach(function(facade) {
				// console.debug('calling gateOff for');
				// console.debug(facade);
				// console.debug(self.gateOffCallback);
				facade.gateOff(self.gateOffCallback, self);
			});
		};
	};

	return iCanTrigger;
});
