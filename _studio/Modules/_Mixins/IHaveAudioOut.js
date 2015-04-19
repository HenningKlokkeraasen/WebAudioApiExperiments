define([], function() {
	var iHaveAudioOut = function() {

		this.connect = function(destination) {
			if (destination instanceof AudioNode) {
				// audio graph
				this.output.connect(destination);
			} else {
				console.group();
				console.warn('destination is not an AudioNode. destination is:');
				console.warn(destination);
				console.warn('this is a/an');
				console.warn(this);
				console.groupEnd();
			}
		};

		this.disconnect = function() {
			this.output.disconnect(0); // disconnects to all destinations (?)
		};

		this.output = undefined; // TODO rename to audioOut

	};

	return iHaveAudioOut;
});
