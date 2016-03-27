define([], function() {
	var iHaveAudioOut = function() {
		// Returns 1 if connected, -1 if disconnected, 0 if error
		this.connectOrDisconnect = function(destination) {
			if (destination instanceof AudioNode) {
				// can not call base property directly, bind call to this
				// TODO get rid of prototypes and mixins
				var nodesIHaveConnectedTo = this.getNodesIHaveConnectedTo.call(this);
				var index = nodesIHaveConnectedTo.indexOf(destination);
				if (index > -1) {
					// console.log('already connected to destination. disconnecting');
					this.disconnect.call(this, destination);
					this.removeFromNodesIHaveConnectedTo.call(this, index);
					// console.log(this.nodesIHaveConnectedTo);
					return -1;
				}
				else {
					// console.log('connecting to destination');
					this.connect.call(this, destination);
					this.addToNodesIHaveConnectedTo.call(this, destination);
					return 1;
				}
			} else {
				console.group();
				console.warn('destination is not an AudioNode. destination is:');
				console.warn(destination);
				console.warn('this is a/an');
				console.warn(this);
				console.groupEnd();
				return 0;
			}
		};
		
		this.connect = function(destination) {
			this.output.connect(destination);
			return this;
		}
		
		this.disconnect = function(destination) {
			try {
				this.output.disconnect(destination);
			} catch (ex) {
				// console.warn(`was not connected to ${destination}, ex ${ex}`);
			}
			return this;
		}
		
		this.getNodesIHaveConnectedTo = function() {
			if (this.nodesIHaveConnectedTo == undefined)
				this.nodesIHaveConnectedTo = [];
			return this.nodesIHaveConnectedTo;
		}

		this.setNodesIHaveConnectedTo = function(nodesIHaveConnectedTo) {
			// console.log('set before');
			// console.log(this.nodesIHaveConnectedTo);
			this.nodesIHaveConnectedTo = nodesIHaveConnectedTo;
			// console.log('set after');
			// console.log(this.nodesIHaveConnectedTo);
		}

		this.removeFromNodesIHaveConnectedTo = function(index) {
			// console.log('delete before');
			// console.log(this.nodesIHaveConnectedTo);
			this.nodesIHaveConnectedTo.splice(index, 1)
			// console.log('delete after');
			// console.log(this.nodesIHaveConnectedTo);
		}

		this.addToNodesIHaveConnectedTo = function(destination) {
			var nodesIHaveConnectedTo = this.getNodesIHaveConnectedTo.call(this);
			// console.log('add before');
			// console.log(nodesIHaveConnectedTo);
			nodesIHaveConnectedTo.push(destination);
			this.setNodesIHaveConnectedTo.call(this, nodesIHaveConnectedTo);
			// console.log('add after');
			nodesIHaveConnectedTo = this.getNodesIHaveConnectedTo.call(this);
			// console.log(nodesIHaveConnectedTo);
		}

		this.output = undefined; // TODO rename to audioOut

	};

	return iHaveAudioOut;
});
