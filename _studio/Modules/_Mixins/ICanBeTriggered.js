define([], function() {
	var iCanBeTriggered = function() {

		// this.triggerIn = undefined;
		// this.triggerInValue = 0.5;
		// this.triggerInMaxValue = 1;
		// this.triggerInMinValue = 0;

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
