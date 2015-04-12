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
            
            
            this.amount = new GainFacade(this.audioContext);
            this.controlOut = this.amount.output;
        };

        // private
        LfoFacade.prototype.setDefaultValues = function() {
            OscillatorFacade.prototype.setDefaultValues.call(this); // base()
            this.setDepth(1);
            this.setRate(10);
        };

        // private
        LfoFacade.prototype.wireUp = function() {
            this.input.connect(this.amount.output);
            this.amount.output.connect(this.output.output);
            



        };

        LfoFacade.prototype.connect = function(destination) {//TODO define what each facade have of connect, control and trigger
             // this.output.connect(destination);
            console.warn('LFO can not be connected to audio chain, only to parameters - see LfoFacade.prototype.control(audioParam)');
            return this;
        };

        // connect to an audioParam (not an audioNode) moved to base class
        // LfoFacade.prototype.control = function(audioParam) {
        //     this.amount.connect(audioParam);
        //     return this;
        // };

        LfoFacade.prototype.setShape = function(type) {
            OscillatorFacade.prototype.setType.call(this, type);
            return this;
        };

        LfoFacade.prototype.setRate = function(value) {
            if (value > this.max_frequency)
                value = this.max_frequency;
            OscillatorFacade.prototype.setFrequency.call(this, value); // base()
            return this;
        };

        LfoFacade.prototype.setDepth = function(value) {
            this.amount.setGain(value);
            return this;
        };

        LfoFacade.prototype.start = function() {
            OscillatorFacade.prototype.start.call(this);
            return this;
        };

        LfoFacade.prototype.stop = function() {
            OscillatorFacade.prototype.stop.call(this);
            return this;
        };
        
        LfoFacade.prototype.max_frequency = 20;

        return LfoFacade;
    }
);