define([], function() {
	var iCanTrigger = function() {

		// this.facadesToTrigger = [];//aka triggerDestinations
		// this.gateOnCallback = undefined;
		// this.gateOffCallback = undefined;

		// Returns 1 if connected, -1 if disconnected, 0 if error
		this.setTriggerFor = function(destination) {
			// if (destination instanceof iCanBeTriggered) {
				// set trigger
				var facadesToTrigger = this.getFacadesToTrigger.call(this);
				
				var index = facadesToTrigger.indexOf(destination);
				// console.log(index);
				if (index > -1) {
					// console.log('already connected to destination. disconnecting');
					// this.output.disconnect(destination);
					this.removeFromFacadesToTrigger.call(this, index);
					console.log(this.facadesToTrigger);
					return -1;
				}
				else {
					// console.log('connecting to destination');
					this.facadesToTrigger.push(destination);
					// this.connect.call(this, destination);
					// this.addToNodesIHaveConnectedTo.call(this, destination);
					return 1;
				}
			// } else {
			// 	console.group();
			// 	console.warn('destination is not a Facade. destination is:');
			// 	console.warn(destination);
			// 	console.warn('this is a/an');
			// 	console.warn(this);
			// 	console.groupEnd();
			// }
			
			return 1;
		};

		this.trigger = function() {
			var self = this;
			if (this.facadesToTrigger != undefined)
				this.facadesToTrigger.forEach(function(facade) {
					// console.debug('calling gateOn for ')
					// console.debug(facade);
					// console.debug(self.gateOnCallback);
					facade.gateOn(self.gateOnCallback, self);
				});
		};

		this.release = function() {
			var self = this;
			if (this.facadesToTrigger != undefined)
				this.facadesToTrigger.forEach(function(facade) {
					// console.debug('calling gateOff for');
					// console.debug(facade);
					// console.debug(self.gateOffCallback);
					facade.gateOff(self.gateOffCallback, self);
				});
		};
		
		this.getFacadesToTrigger = function() {
			if (this.facadesToTrigger == undefined)
				this.facadesToTrigger = [];
			return this.facadesToTrigger;
		}

		this.removeFromFacadesToTrigger = function(index) {
			// console.log('delete before');
			// console.log(this.nodesIHaveConnectedTo);
			this.facadesToTrigger.splice(index, 1)
			// console.log('delete after');
			// console.log(this.nodesIHaveConnectedTo);
		}

	};

	return iCanTrigger;
});
