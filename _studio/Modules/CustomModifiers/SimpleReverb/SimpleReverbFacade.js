/*
    Web Audio API - custom nodes - SimpleReverb
    From https://github.com/web-audio-components/simple-reverb
*/
define([
    '/_WebAudioApiFacades/_FacadeBase2.js'
    ], function(FacadeBase2) {
        SimpleReverbFacade.prototype = Object.create(FacadeBase2.prototype);
        SimpleReverbFacade.prototype.constructor = SimpleReverbFacade;

        function SimpleReverbFacade(audioContext) {
            FacadeBase2.call(this, audioContext); // base()
            this._buildImpulse();
            return this;
        }

        // private
        SimpleReverbFacade.prototype.initNodes = function() {
            this.input = this.audioContext.createConvolver();
            this.output = this.input;



        };

        // private
        SimpleReverbFacade.prototype.setDefaultValues = function() {
            this._seconds = 3;
            this._decay = 2;
            this._reverse = false;
        };

        // private
        SimpleReverbFacade.prototype.wireUp = function() {






        };

        SimpleReverbFacade.prototype.setSeconds = function(value) {
            this._seconds = parseFloat(value);
            //console.log('reverb setSeconds: ' + value);
            this._buildImpulse();
            return this;
        };

        SimpleReverbFacade.prototype.seDecay = function(value) {
            this._decay = parseFloat(value);
            //console.log('reverb seDecay: ' + value);
            this._buildImpulse();
            return this;
        };

        SimpleReverbFacade.prototype.setReverse = function(value) {
            // special case if value instead of checked property is sent
            if (value == 'on')
                value = false;

            this._reverse = value;
            //console.log('reverb reverse: ' + value);
            this._buildImpulse();
            return this;
        };

        /*
        * Utility function for building an impulse response
        * from the module parameters.
        */
        SimpleReverbFacade.prototype._buildImpulse = function() {
            var rate = this.audioContext.sampleRate;
            var length = rate * this._seconds;
            var decay = this._decay;
            var impulse = this.audioContext.createBuffer(2, length, rate);
            var impulseL = impulse.getChannelData(0);
            var impulseR = impulse.getChannelData(1);
            var n;
            var i;

            for (i = 0; i < length; i++) {
                n = this._reverse ? length - i : i;
                impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
                impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
            }

            this.input.buffer = impulse;
        };

        return SimpleReverbFacade;
    }
);