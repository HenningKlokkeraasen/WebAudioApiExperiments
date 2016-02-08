define([], function() {
	var icanSendPitchControlOut = function() {

		// this.controlOut = undefined;

		this.control = function(destination) {
			// if (destination instanceof AudioParam) {
				var nodesIControl = this.getNodesIControl.call(this);
				var index = nodesIControl.indexOf(destination);
				console.log(index);
				if (index > -1) {
					console.log('already connected to destination. disconnecting');
					this.removeFromNodesIControl.call(this, index);
					// console.log(this.nodesIHaveConnectedTo);
					return -1;
				}
				else {
					console.log('connecting to destination');
					this.controlDestinations.push(destination);
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
			
			// TODO implement uncontrol
			return 1;
		};

		this.getNodesIControl = function() {
			if (this.controlDestinations == undefined)
				this.controlDestinations = [];
			return this.controlDestinations;
		}

		this.removeFromNodesIControl = function(index) {
			// console.log('delete before');
			// console.log(this.nodesIHaveConnectedTo);
			this.controlDestinations.splice(index, 1)
			// console.log('delete after');
			// console.log(this.nodesIHaveConnectedTo);
		}

	};

	return icanSendPitchControlOut;
});
