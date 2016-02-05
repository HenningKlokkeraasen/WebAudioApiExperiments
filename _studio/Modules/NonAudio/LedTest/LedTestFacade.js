/*
    Web Audio API - custom nodes - LedTest
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    ], function(FacadeBase) {
        LedTestFacade.prototype = Object.create(FacadeBase.prototype);
        LedTestFacade.prototype.constructor = LedTestFacade;

        function LedTestFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

            return this;
        }

        // private
        LedTestFacade.prototype.initNodes = function() {
        };

        // private
        LedTestFacade.prototype.setDefaultValues = function() {
        };

        // private
        LedTestFacade.prototype.wireUp = function() {
        };

        return LedTestFacade;
    }
);