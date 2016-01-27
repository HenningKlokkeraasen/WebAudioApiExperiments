/*
    Web Audio API - custom nodes - modulator in audible range
*/
define([
    '/_studio/Modules/CustomModulators/LFO/LfoFacade.js'
    ], function(LfoFacade) {
        ModulatorAudibleRangeFacade.prototype = Object.create(LfoFacade.prototype);
        ModulatorAudibleRangeFacade.prototype.constructor = LfoFacade;

        function ModulatorAudibleRangeFacade(audioContext) {
            LfoFacade.call(this, audioContext); // base()
            this.actsAsModulatorInAudibleRange = true;
            return this;
        }

        return ModulatorAudibleRangeFacade;
    }
);