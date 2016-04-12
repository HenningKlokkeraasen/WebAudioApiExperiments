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
			this.gateSignal.on.dispatch(audioTime);
		};

		this.release = function(audioTime) {
			this.gateSignal.off.dispatch(audioTime);
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

        this.gateOn = function(audioTime) {
			var facadesToTrigger = this.getFacadesToTrigger.call(this);
            var self = this;
            facadesToTrigger.forEach(function(facade) {
                if (facade.triggerIn)
                {
                	// console.log(`${facade.triggerInValue} ${facade.triggerInMaxValue} ${facade.triggerInMinValue}`);
                	self.runAttackDecay(facade.triggerIn, facade.triggerInMaxValue, facade.triggerInValue, audioTime);
                }
            });
        }

        this.gateOff = function(audioTime) {
			var facadesToTrigger = this.getFacadesToTrigger.call(this);
            var self = this;
            facadesToTrigger.forEach(function(facade) {
                if (facade.triggerIn)
                {
                	// console.log(`${facade.triggerInValue} ${facade.triggerInMaxValue} ${facade.triggerInMinValue}`);
                	self.runRelease(facade.triggerIn, facade.triggerInMinValue, audioTime);
                }
            });
        };

        // Default implementation. Typically overridden in more sophisticated ADSR Envelope Generator
        this.runAttackDecay = function(audioParam, rampUpToValue, value, audioTime) {
        	audioParam.setValueAtTime(rampUpToValue, audioTime);
        }

        // Default implementation. Typically overridden in more sophisticated ADSR Envelope Generator
        this.runRelease = function(audioParam, rampDownToValue, audioTime) {
        	audioParam.setValueAtTime(rampDownToValue, audioTime);
        }
	};

	return iCanTrigger;
});
