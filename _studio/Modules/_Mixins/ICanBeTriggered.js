define([], function() {
	var iCanBeTriggered = function() {

		// this.triggerIn = undefined;

		this.onGateOn = function() {
			// console.warn('implement onGateOn in in-mixing class');
			// this.triggerIn.gain.value = 1;
		};

		this.onGateOff = function() {
			// console.warn('implement onGateOff in in-mixing class');
			// this.triggerIn.gain.value = 0;
		};
	};
	return iCanBeTriggered;
});
