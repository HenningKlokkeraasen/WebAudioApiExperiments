/*
    Web Audio API - custom nodes - BlankPanel
*/
define([
	'/_studio/Modules/_FacadeBase.js',
    ], function(FacadeBase) {
        BlankPanelFacade.prototype = Object.create(FacadeBase.prototype);
        BlankPanelFacade.prototype.constructor = BlankPanelFacade;

        function BlankPanelFacade(audioContext) {
            FacadeBase.call(this, audioContext); // base()

            return this;
        }

        // private
        BlankPanelFacade.prototype.initNodes = function() {
        };

        // private
        BlankPanelFacade.prototype.setDefaultValues = function() {
        };

        // private
        BlankPanelFacade.prototype.wireUp = function() {
        };

        return BlankPanelFacade;
    }
);