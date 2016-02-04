define([], function() {
	var icanControlAudioParam = function() {

		// this.controlOut = undefined;

		this.control = function(destination) {
			if (destination instanceof AudioParam) {
				// control graph
				this.controlOut.connect(destination);
			} else {
				console.group();
				console.warn('destination is not an AudioParam. destination is:');
				console.warn(destination);
				console.warn('this is a/an');
				console.warn(this);
				console.groupEnd();
			}
			
			// TODO implement uncontrol
			return 1;
		};

		this.uncontrol = function() {
			this.controlOut.disconnect(0); // disconnects to all destinations (?)
		};

	};

	return icanControlAudioParam;
});
