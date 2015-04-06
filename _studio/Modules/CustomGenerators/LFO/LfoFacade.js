/*
    Web Audio API - custom nodes - LFO (Low Frequency Oscillator)
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js'
    ], function(OscillatorFacade, GainFacade) {
        LfoFacade.prototype = Object.create(OscillatorFacade.prototype);
        LfoFacade.prototype.constructor = LfoFacade;

        function LfoFacade(audioContext) {
            OscillatorFacade.call(this, audioContext); // base()

            return this;
        }

        // private
        LfoFacade.prototype.initNodes = function() {
            OscillatorFacade.prototype.initNodes.call(this); // base()
            
            
            this.amount = this.output
            
        };

        // private
        LfoFacade.prototype.setDefaultValues = function() {
            OscillatorFacade.prototype.setDefaultValues.call(this); // base()
            this.setDepth(1);
            this.setRate(10);
        };

        // private
        LfoFacade.prototype.wireUp = function() {
            OscillatorFacade.prototype.wireUp.call(this); // base()

            



        };

        LfoFacade.prototype.connect = function(destination) {
             // this.output.connect(destination);
            console.warn('LFO can not be connected to audio chain, only to parameters - see LfoFacade.prototype.control(audioParam)');
            return this;
        };

        // connect to an audioParam (not an audioNode)
        LfoFacade.prototype.control = function(audioParam) {
            this.amount.connect(audioParam);
            return this;
        };

        LfoFacade.prototype.setRate = function(value) {
            if (value > this.max_frequency)
                value = this.max_frequency;
            OscillatorFacade.prototype.setFrequency.call(this, value); // base()
            return this;
        };

        LfoFacade.prototype.setDepth = function(value) {
            if (value > this.max_frequency)
                value = this.max_frequency;
            this.amount.setGain(value);
            return this;
        };

        LfoFacade.prototype.max_frequency = 20;

        return LfoFacade;
    }
);