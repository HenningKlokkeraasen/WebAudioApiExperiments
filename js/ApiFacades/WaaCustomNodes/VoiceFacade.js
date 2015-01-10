
/*


	Web Audio API wrapper - Voice (VCO and VCA)


*/

VoiceFacade.prototype = Object.create(FacadeBase2.prototype);
VoiceFacade.prototype.constructor = VoiceFacade;

function VoiceFacade(audioContext) {

    // Note: key/value pairs
    // (json objects)
    // must not be set as VoiceFacade.prototype.lfos = {} 
    // because that's a static property 
    // for ALL instances of VoiceFacade
    this.lfos = {};
    this.lfoGains = {};
    this.vcos = {};
    this.vcas = {};

    FacadeBase2.call(this, audioContext); // base()

    //this.synth = new Synthesizer2(audioContext, this, globalCounter++);
    //new KeyboardController(this.synth, globalCounter);

	return this;
};

// private
VoiceFacade.prototype.initNodes = function() {
    //this.input = new GainFacade(this.audioContext);
    //this.output = this.input;
	var self = this;
	$.each(Synthesizer.prototype.noteToFrequencyTable, function(note, frequency) {
		self.vcos[note] = new VcoFacade(self.audioContext);
		//console.log('VCO: Creating oscillator for note ' + note);
        self.vcas[note] = new VcaFacade(self.audioContext);
        //console.log('VCA: Creating oscillator for note ' + note);
	});
};

// private
VoiceFacade.prototype.setDefaultValues = function() {
};

// private
VoiceFacade.prototype.wireUp = function() {
    var self = this;
    $.each(Synthesizer.prototype.noteToFrequencyTable, function(note, frequency) {
        var vcoFacade = self.vcos[note];
        var vcaFacade = self.vcas[note];
        vcoFacade.output.connect(vcaFacade.input);
        //svcaFacade.output.connect(self.output.input);
    });
};

VoiceFacade.prototype.connect = function(destination) {
    console.log('facade ' + this.hasModulator + ' ' + this.hasFilter + ' connect');
    $.each(this.vcas, function(note, vca) { vca.connect(destination); });
    return this;
};

VoiceFacade.prototype.hasFilter = false;

VoiceFacade.prototype.hasModulator = false;

VoiceFacade.prototype.setHasFilter = function(value) {
    this.hasFilter = value;
    //console.log('facade this.hasFilter ' + this.hasFilter );
};

VoiceFacade.prototype.setHasModulator = function(value) {
    this.hasModulator = value;
    //console.log('facade this.hasModulator ' + this.hasModulator );
    if (this.hasModulator)
        this.connectModulators();
};

VoiceFacade.prototype.gateOn = function(note) {
    console.log('facade ' + this.hasModulator + ' ' + this.hasFilter + ' gateOn');
    this.vcas[note].gateOn();
    return this;
}

VoiceFacade.prototype.gateOff = function(note) {
    this.vcas[note].gateOff();
    return this;
};

VoiceFacade.prototype.setAttackTime = function(value) {
    //console.log('facade ' + this.hasModulator + ' ' + this.hasFilter + ' setAttackTime');
    $.each(this.vcas, function(note, vca) { vca.setAttackTime(value); });
    return this;
};

VoiceFacade.prototype.setDecayTime = function(value) {
    $.each(this.vcas, function(note, vca) { vca.setDecayTime(value); });
    return this;
};

VoiceFacade.prototype.setSustainLevel = function(value) {
    $.each(this.vcas, function(note, vca) { vca.setSustainLevel(value); });
    return this;
};

VoiceFacade.prototype.setReleaseTime = function(value) {
    $.each(this.vcas, function(note, vca) { vca.setReleaseTime(value); });
    return this;
};

VoiceFacade.prototype.setType = function(type) {
    //console.log('facade setType to ' + type);
    console.log('facade ' + this.hasModulator + ' ' + this.hasFilter + ' setType ' + type);
	$.each(this.vcos, function(note, vco) { vco.setType(type); });
	return this;
};

VoiceFacade.prototype.setFrequency = function(frequency, note) {
	if (note)
		this.vcos[note].setFrequency(frequency);
	return this;
};

VoiceFacade.prototype.setDetune = function(semitone, note) {
	if (note)
		this.vcos[note].setDetune(semitone);
	return this;
};

VoiceFacade.prototype.pitchBendIsh = function(detuneValue, note) {
	if (note)
		this.vcos[note].pitchBendIsh(detuneValue);
	return this;
};

VoiceFacade.prototype.connectModulators = function() {
    var self = this;
    $.each(this.vcos, function(note, vco) {
        // initNodes
        self.lfos[note] = new LfoFacade(self.audioContext);
        //console.log('LFO: Creating modulator for vco ' + vco);
        self.lfoGains[note] = new GainFacade(self.audioContext);

        // wireUp
        self.lfos[note].output.connect(self.lfoGains[note].input);
        self.lfoGains[note].output.connect(vco.input.frequency);
    });
};

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
