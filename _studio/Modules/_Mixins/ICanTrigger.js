define(['app/Signal'], function(Signal) {
	var iCanTrigger = function() {

		this.gateSignal = {
			on: new Signal(),
			off: new Signal()
		};

		// this.facadesToTrigger = [];//aka triggerDestinations

		// Returns 1 if connected, -1 if disconnected, 0 if error
		this.setTriggerFor = function(destination) {
			// console.log(myObject);
			// if (destination instanceof iCanBeTriggered) {
				// set trigger
				var facadesToTrigger = this.getFacadesToTrigger.call(this);
				
				var index = facadesToTrigger.indexOf(destination);
				// console.log(index);
				if (index > -1) {
					this.gateSignal.on.remove(destination.onGateOn.bind(destination));
					this.gateSignal.off.remove(destination.onGateOff.bind(destination));
					// console.log('already connected to destination. disconnecting');
					// this.output.disconnect(destination);
					this.removeFromFacadesToTrigger.call(this, index);
					// console.log(this.facadesToTrigger);
					return -1;
				}
				else {
					this.gateSignal.on.add(destination.onGateOn.bind(destination));
					this.gateSignal.off.add(destination.onGateOff.bind(destination));
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
			
			// return 1;
		};

		this.trigger = function(audioTime) {
			// console.log('triggering');
			this.gateSignal.on.dispatch(audioTime);
			// var self = this;
			// if (this.facadesToTrigger != undefined)
			// 	this.facadesToTrigger.forEach(function(facade) {
			// 		 // console.debug('calling gateOn for ')
			// 		// console.debug(facade);
			// 		// console.debug(self.gateOnCallback);
			// 		facade.gateOn(self.gateOnCallback, self);
			// 	});
		};

		this.release = function(audioTime) {
			// console.log('releasing');
			this.gateSignal.off.dispatch(audioTime);
			// var self = this;
			// if (this.facadesToTrigger != undefined)
			// 	this.facadesToTrigger.forEach(function(facade) {
			// 		// console.debug('calling gateOff for');
			// 		// console.debug(facade);
			// 		// console.debug(self.gateOffCallback);
			// 		facade.gateOff(self.gateOffCallback, self);
			// 	});
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

		// this.onGateOn = function(audioTime) {
  //           var self = this;
  //           if (this.facadesToTrigger != undefined)
  //               this.facadesToTrigger.forEach(function(facade) {
  //                   if (facade.triggerIn)
  //                   	self.runAttackDecay(facade.triggerIn, 1, audioTime);
  //               });
  //       };

  //       this.onGateOff = function(audioTime) {
  //           var self = this;
  //           if (this.facadesToTrigger != undefined)
  //               this.facadesToTrigger.forEach(function(facade) {
  //                   if (facade.triggerIn)
  //                   	self.runRelease(facade.triggerIn, 0, audioTime);
  //               });
  //       };
	};

	return iCanTrigger;
});
