/*
    Web Audio API - custom nodes - LFO (Low Frequency Oscillator)
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js',
    '/_studio/Modules/_Mixins/ICanModulate.js',
	'/_studio/Modules/_Mixins/ICanBeModulated.js'
    ], function(OscillatorFacade, GainFacade, ICanModulate, ICanBeModulated) {
        LfoFacade.prototype = Object.create(OscillatorFacade.prototype);
        LfoFacade.prototype.constructor = LfoFacade;

        function LfoFacade(audioContext) {
            OscillatorFacade.call(this, audioContext); // base()
            ICanModulate.call(this);
			ICanBeModulated.call(this);

            return this;
        }

        // private
        LfoFacade.prototype.initNodes = function() {
            OscillatorFacade.prototype.initNodes.call(this); // base()
            
            this.amount = this.audioContext.createGain();
            this.modulateOut = this.amount;
			this.modulateIn = this.input.frequency;
        };

        // private
        LfoFacade.prototype.setDefaultValues = function() {
            OscillatorFacade.prototype.setDefaultValues.call(this); // base()
            this.setDepth(1);
            this.setRate(10);
            this.isOn = false;
        };

        // private
        LfoFacade.prototype.wireUp = function() {
            this.input.connect(this.amount);
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
		
		LfoFacade.prototype.setShapeByNumber = function(number) {
			OscillatorFacade.prototype.setTypeByNumber.call(this, number);
		}

        LfoFacade.prototype.setRate = function(value) {
            // console.debug('actsAsModulatorInAudibleRange: ' + this.actsAsModulatorInAudibleRange);
            if (value > this.max_frequency && !this.actsAsModulatorInAudibleRange)
                value = this.max_frequency;
            OscillatorFacade.prototype.setFrequency.call(this, value); // base()
            return this;
        };

        LfoFacade.prototype.setDepth = function(value) {
            // console.debug('LFO depth set to ' + value);
            this.amount.gain.value = value;
            this.amountValue = value;
            return this;
        };
		
		LfoFacade.prototype.setActsAsModulatorInAudibleRange = function(value) {
			this.actsAsModulatorInAudibleRange = value;
		}

        LfoFacade.prototype.toggleStartStop = function() {
            if (this.isOn)
                this.stop();
            else
                this.start();
        };
        LfoFacade.prototype.start = function() {
            this.isOn = true;
            this.setDepth(this.amountValue);
            OscillatorFacade.prototype.start.call(this);
            return this;
        };

        LfoFacade.prototype.stop = function() {
            this.isOn = false;
            this.amount.gain.value = 0;
            return this;
        };
        
        LfoFacade.prototype.max_frequency = 20;
        LfoFacade.prototype.actsAsModulatorInAudibleRange = false;

        return LfoFacade;
    }
);