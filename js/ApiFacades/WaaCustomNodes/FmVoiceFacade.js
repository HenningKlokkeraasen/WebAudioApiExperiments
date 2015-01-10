
/*


	Web Audio API wrapper - FM Voice (VCO and VCA)


*/

FmVoiceFacade.prototype = Object.create(VoiceFacade.prototype);
FmVoiceFacade.prototype.constructor = FmVoiceFacade;

function FmVoiceFacade(audioContext) {
	VoiceFacade.call(this, audioContext); // base()

	return this;
};

// private
FmVoiceFacade.prototype.initNodes = function() {
	VoiceFacade.prototype.initNodes.call(this); // base()

	var self = this;
	$.each(this.vcos, function(note, vco) {
		self.lfos[note] = new LfoFacade(self.audioContext);
		//console.log('LFO: Creating modulator for vco ' + vco);
		self.lfoGains[note] = new GainFacade(self.audioContext);

	});
};

// private
FmVoiceFacade.prototype.setDefaultValues = function() {
};

// private
FmVoiceFacade.prototype.wireUp = function() {
	VoiceFacade.prototype.wireUp.call(this); // base()
	var self = this;
	$.each(this.vcos, function(note, vco) {
		var lfoFacade = self.lfos[note];
		var gainFacade = self.lfoGains[note];
		lfoFacade.output.connect(gainFacade.input);
		gainFacade.output.connect(vco.input.frequency);
	});
};

FmVoiceFacade.prototype.lfos = {};

FmVoiceFacade.prototype.lfoGains = {};

VoiceFacade.prototype.setModType = function(type) {
	$.each(this.vcos, function(note, lfo) {
		lfo.setType(type);
	});
	return this;
};

VoiceFacade.prototype.setModFreq = function(frequency) {
	$.each(this.lfos, function(note, lfo) {
		lfo.setFrequency(frequency);
	});
	return this;
};

VoiceFacade.prototype.setModGain = function(value) {
	$.each(this.lfoGains, function(note, gain) {
		gain.setGain(value);
	});
	return this;
};
