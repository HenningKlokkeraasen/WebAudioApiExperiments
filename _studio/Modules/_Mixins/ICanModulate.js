define([], function() {
	var iCanModulate = function() {

		// this.modulateOut = undefined;

		this.modulate = function(destination) {
			if (destination instanceof AudioParam) {
				var nodesIControl = this.getNodesIControl.call(this);
				var index = nodesIControl.indexOf(destination);
				if (index > -1) {
					// console.log('already connected to destination. disconnecting');
					this.modulateOut.disconnect(destination);
					this.removeFromNodesIControl.call(this, index);
					// console.log(this.nodesIHaveConnectedTo);
					return -1;
				}
				else {
					// console.log('connecting to destination');
					this.modulateOut.connect(destination);
					this.nodesIControl.push(destination);
					return 1;
				}
			} else {
				console.group();
				console.warn('destination is not an AudioParam. destination is:');
				console.warn(destination);
				console.warn('this is a/an');
				console.warn(this);
				console.groupEnd();
			}
			
			return 1;
		};

		this.getNodesIControl = function() {
			if (this.nodesIControl == undefined)
				this.nodesIControl = [];
			return this.nodesIControl;
		}

		this.removeFromNodesIControl = function(index) {
			// console.log('delete before');
			// console.log(this.nodesIHaveConnectedTo);
			this.nodesIControl.splice(index, 1)
			// console.log('delete after');
			// console.log(this.nodesIHaveConnectedTo);
		}

	};

	return iCanModulate;
});
