define([], function() {
	var iCanSetFrequency = function() {

		// this.frequencySetOut = undefined;

		this.setFrequencyFor = function(destination) {
			
			// if (destination instanceof AudioParam) {
				var frequencySetDestinations = this.getNodesIControl.call(this);
				var index = frequencySetDestinations.indexOf(destination);
				if (index > -1) {
					// console.log('already connected to destination. disconnecting');
					// this.frequencySetOut.disconnect(destination);
					this.removeFromNodesIControl.call(this, index);
					// console.log(this.nodesIHaveConnectedTo);
					return -1;
				}
				else {
					// console.log('connecting to destination');
					// this.frequencySetIn.connect(destination);
					this.frequencySetDestinations.push(destination);
					return 1;
				}
			// } else {
			// 	console.group();
			// 	console.warn('destination is not an AudioParam. destination is:');
			// 	console.warn(destination);
			// 	console.warn('this is a/an');
			// 	console.warn(this);
			// 	console.groupEnd();
			// }
			
			// return 1;
		};

		this.getNodesIControl = function() {
			if (this.frequencySetDestinations == undefined)
				this.frequencySetDestinations = [];
			return this.frequencySetDestinations;
		}

		this.removeFromNodesIControl = function(index) {
			// console.log('delete before');
			// console.log(this.nodesIHaveConnectedTo);
			this.frequencySetDestinations.splice(index, 1)
			// console.log('delete after');
			// console.log(this.nodesIHaveConnectedTo);
		}

		this.setFrequency = function(frequency, audioTime) {
			var frequencySetDestinations = this.getNodesIControl.call(this);
			frequencySetDestinations.forEach(function(destination) {
				if (destination.cancelScheduledValues != undefined)
					destination.cancelScheduledValues(audioTime);
				if (destination.exponentialRampToValueAtTime != undefined)
					destination.exponentialRampToValueAtTime(frequency, audioTime);
				// hack? will only work for oscillators
			});
		}
	};

	return iCanSetFrequency;
});
