
/*


	Web Audio API wrapper - filter


*/

FilterFacade.prototype = new FacadeBase();
FilterFacade.prototype.constructor = FilterFacade;

function FilterFacade(audioContext) {
	this.audioContext = audioContext;
	this.node = audioContext.createBiquadFilter();






	return this;
}

FilterFacade.prototype.qualityMultiplier = 30; // todo parameterize

FilterFacade.prototype.setType = function(type) {
	this.node.type = type;
	return this;
};

FilterFacade.prototype.setFrequencyByAbsoluteValue = function(value) {
	this.node.frequency.value = value;
	return this;
};

FilterFacade.prototype.setFrequencyByScale = function(scalerValue) {
	//console.log("filter of type " +
	//	this.node.type +
	//	" will change frequency scaler to " +
	//	value)

	// Clamp the frequency between the minimum value (40 Hz) and half of the
	// sampling rate.
	var minValue = 40;
	var maxValue = this.audioContext.sampleRate / 2;

	// Logarithm (base 2) to compute how many octaves fall in the range
	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;

	// Compute a multiplier from 0 to 1 based on an exponential scale
	var multiplier = Math.pow(2, numberOfOctaves * (scalerValue - 1.0));

	// Get back to the frequency value between min and max
	var freq = maxValue * multiplier;
	//console.log("Filter: scaler " + scalerValue + ", gives frequency " + freq);
	this.node.frequency.value = freq;
	return this;
};

FilterFacade.prototype.setQuality = function(value) {
	//console.log("filter of type " +
	//	this.node.type +
	//	" will change quality scaler to " +
	//	value)
	this.node.Q.value = value * this.qualityMultiplier;
	return this;
};

FilterFacade.prototype.setGain = function(value) {
	this.node.gain.value = value;
	return this;
};
