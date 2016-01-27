/*
    Module factory for AudioDestinationNode in Web Audio API
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/AudioDestination/AudioDestinationFacade.js'
    ], function(ModuleFactoryBase, AudioDestinationFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        AudioDestinationModuleFactory.prototype = new ModuleFactoryBase();
        AudioDestinationModuleFactory.prototype.constructor = AudioDestinationModuleFactory;

        function AudioDestinationModuleFactory() {
            this.moduleCssClass = 'audioContextDestination';
            this.hasAudioOut = false;
            
        }
        AudioDestinationModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : AudioDestinationFacade,
        		parameters : [





        		],
        		
            };
        };
        // moduleData
        //      name
        //      shortName
        //
        //
        //
        //
        //
        //
        //
        AudioDestinationModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 











            });
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return AudioDestinationModuleFactory;
    }
);