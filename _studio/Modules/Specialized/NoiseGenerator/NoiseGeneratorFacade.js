/*
    Web Audio API - custom nodes - Noise generator
    http://noisehack.com/generate-noise-web-audio-api/
    https://medium.com/web-audio/you-dont-need-that-scriptprocessor-61a836e28b42
*/
define([
    '/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
    ], function(FacadeBase, ICanBeTriggered) {
        NoiseGeneratorFacade.prototype = Object.create(FacadeBase.prototype);
        NoiseGeneratorFacade.prototype.constructor = NoiseGeneratorFacade;

        function NoiseGeneratorFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
        }

        // private
        NoiseGeneratorFacade.prototype.initNodes = function() {
            this.createBufferSource();
            this.setNoiseType(this.noiseType);
            this.output = this.audioContext.createGain();
        };

        // private
        NoiseGeneratorFacade.prototype.setDefaultValues = function() {
            this.output.gain.value = 0;
            this.isOn = false;
        };

        // private
        NoiseGeneratorFacade.prototype.wireUp = function() {
            this.input.connect(this.output);
        };

        NoiseGeneratorFacade.prototype.noiseTypes = [ 
            { name : 'White Noise', value : 'white', selected : true }, 
            { name : 'Pink Noise', value : 'pink' }, 
            { name : 'Brown Noise', value : 'brown' } 
        ];

        NoiseGeneratorFacade.prototype.noiseType = 'white'; // default

        NoiseGeneratorFacade.prototype.setNoiseType = function(noiseType) {
            this.noiseType = noiseType;
            switch (noiseType) {
                case 'white' :
                    this.setWhiteNoiseData();
                    break;
                case 'pink' :
                    this.setPinkNoiseData();
                    break;
                case 'brown' : 
                    this.setBrownNoiseData();
                    break;
            }
        };

        NoiseGeneratorFacade.prototype.toggleStartStop = function() {
            if (this.isOn)
                this.stop();
            else
                this.start();
        };
        
        NoiseGeneratorFacade.prototype.start = function() {
            this.isOn = true;
			if (!this.hasBeenStartedOnce)
			{
				this.input.start(0);
				this.hasBeenStartedOnce = true;
			}
            this.output.gain.value = 1;
            return this;
        };

        NoiseGeneratorFacade.prototype.stop = function() {
            this.isOn = false;
            this.output.gain.value = 0;
            return this;
        };

        NoiseGeneratorFacade.prototype.createBufferSource = function() {
            this.input = this.audioContext.createBufferSource();
            var numberOfChannels = 1;
            var bufferSize = 10 * this.audioContext.sampleRate; // 4096 <- clicks every end of buffer for pink, brown noise
            var sampleRate = this.audioContext.sampleRate;
            var buffer = this.audioContext.createBuffer(numberOfChannels, bufferSize, sampleRate);
            var data = buffer.getChannelData(0);

            this.data = data;
            this.bufferSize = bufferSize;

            this.input.buffer = buffer;
            this.input.loop = true;
        };

        NoiseGeneratorFacade.prototype.setWhiteNoiseData = function() {
            for (var i = 0; i < this.bufferSize; i++) {
                this.data[i] = Math.random(); // or Math.random() * 2 - 1;
            }
        };

        NoiseGeneratorFacade.prototype.setPinkNoiseData = function() {
            var b0, b1, b2, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

            for (var i = 0; i < this.bufferSize; i++) {
                var white = Math.random(); // or Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                this.data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                this.data[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        };

        NoiseGeneratorFacade.prototype.setBrownNoiseData = function() {
            var lastOut = 0.0;

            for (var i = 0; i < this.bufferSize; i++) {
                var white = Math.random(); // or Math.random() * 2 - 1;
                this.data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = this.data[i];
                this.data[i] *= 3.5; // (roughly) compensate for gain
            }
        };
		
		//region iCanBeTriggered
		NoiseGeneratorFacade.prototype.gateOn = function(callback, originator) {
			// console.debug('output.gain.value before is ' + this.output.gain.value);
			// this.output.gain.value = 1;
			// console.debug('output.gain.value after is ' + this.output.gain.value);
			// console.debug('in GainFacade.gateOn, callback is ');
			// console.debug(callback);
			callback.call(originator, this.output.gain, 1, 0.0001);
		};

		NoiseGeneratorFacade.prototype.gateOff = function(callback, originator) {
			// console.debug('output.gain.value before is ' + this.output.gain.value);
			// this.output.gain.value = 0;
			// console.debug('output.gain.value after is ' + this.output.gain.value);
			// console.debug('in GainFacade.gateOff, callback is ');
			// console.debug(callback);
			callback.call(originator, this.output.gain, 0.0001);
		};
		//endregion iCanBeTriggered


        return NoiseGeneratorFacade;
    }
);
