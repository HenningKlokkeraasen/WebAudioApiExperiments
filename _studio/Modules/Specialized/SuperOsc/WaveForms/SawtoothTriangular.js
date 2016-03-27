define([
	'/_studio/Modules/_FacadeBase.js',
	], function(FacadeBase) {
		SawtoothTriangular.prototype = Object.create(FacadeBase.prototype); // new FacadeBase2();
		SawtoothTriangular.prototype.constructor = SawtoothTriangular;
		
		function SawtoothTriangular(audioContext) {
			FacadeBase.call(this, audioContext); // base()
			// this.hasBeenInitialized = false;
		}
		
		// private
		SawtoothTriangular.prototype.initNodes = function() {
			this.saw = this.audioContext.createOscillator();
			this.tri = this.audioContext.createOscillator();
			
			this.sawgain = this.audioContext.createGain();
			this.trigain = this.audioContext.createGain();
			
			this.output = this.audioContext.createGain();
			// this.controlOut = this.output;
			// this.controlIn = this.input.frequency;
		};

		// private
		SawtoothTriangular.prototype.setDefaultValues = function() {
			//this.input.start(0);
			this.saw.type = 'sawtooth';
			this.tri.type = 'triangle';
			this.output.gain.value = 0;
			this.sawgain.gain.value = 0.5;
			this.trigain.gain.value = 0.5;
			this.hasBeenStartedOnce = false;
		};

		// private
		SawtoothTriangular.prototype.wireUp = function() {
			this.saw.connect(this.sawgain);
			this.tri.connect(this.trigain);
			this.sawgain.connect(this.output);
			this.trigain.connect(this.output);
		};

		SawtoothTriangular.prototype.setFrequency = function(frequency) {
			this.saw.frequency.value = parseFloat(frequency);
			this.tri.frequency.value = parseFloat(frequency);
			return this;
		};

		SawtoothTriangular.prototype.setDetune = function(semitone) {
			this.saw.detune.value = parseFloat(semitone); // * 100;
			this.tri.detune.value = parseFloat(semitone); // * 100;
			return this;
		};

		SawtoothTriangular.prototype.start = function() {
			if (!this.hasBeenStartedOnce)
			{
				var now = this.audioContext.currentTime;
				var offsetStartTime = now + 0.1;
				this.saw.start(offsetStartTime);
				this.tri.start(offsetStartTime);
				this.hasBeenStartedOnce = true;
			}
			this.output.gain.value = 1;
			return this;
		};

		SawtoothTriangular.prototype.stop = function() {
			this.output.gain.value = 0;
			return this;
		};
		
	return SawtoothTriangular;
});