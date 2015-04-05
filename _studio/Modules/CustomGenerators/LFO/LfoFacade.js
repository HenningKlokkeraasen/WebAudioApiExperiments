/*
    Web Audio API - custom nodes - LFO (Low Frequency Oscillator)
*/
define([
    '/_studio/Modules/_FacadeBase.js'
    ], function(FacadeBase) {
        LfoFacade.prototype = Object.create(FacadeBase.prototype);
        LfoFacade.prototype.constructor = LfoFacade;

        function LfoFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

            return this;
        }

        // private
        LfoFacade.prototype.initNodes = function() {
            this.input = this.audioContext.createOscillator();
            // this.output = this.input;
            this.amount = this.audioContext.createGain();
            this.output = this.amount;

        };

        // private
        LfoFacade.prototype.setDefaultValues = function() {
            this.input.start(0);
            this.setRate(10);
            this.setDepth(1);
        };

        // private
        LfoFacade.prototype.wireUp = function() {
            this.input.connect(this.amount);

            



        };

        // connect to an audioParam (not an audioNode)
        LfoFacade.prototype.control = function(audioParam) {
            this.amount.connect(audioParam);
            return this;
        };

        LfoFacade.prototype.setType = function(type) {
            this.input.type = type;
            return this;
        };

        LfoFacade.prototype.setRate = function(value) {
            if (value > this.max_frequency)
                value = this.max_frequency;
            this.input.frequency.value = value;
            return this;
        };

        LfoFacade.prototype.setDepth = function(value) {
            if (value > this.max_frequency)
                value = this.max_frequency;
            this.amount.gain.value = value;
            return this;
        };

        LfoFacade.prototype.max_frequency = 20;

        return LfoFacade;
    }
);