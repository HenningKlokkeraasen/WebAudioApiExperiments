/*
    Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputFacade.js'
    ], function(ModuleFactoryBase, WebMidiInputFacade) {

        WebMidiInputModuleFactory.prototype = new ModuleFactoryBase();
        WebMidiInputModuleFactory.prototype.constructor = WebMidiInputModuleFactory;

        function WebMidiInputModuleFactory() {
            // this.moduleCssClass = 'wideModule';
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasControlOut = true;
            this.hasKeyboardInterface = true;   // not true per se, but hack to get the output of note
        }
        WebMidiInputModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : WebMidiInputFacade,
                parameters : [

                

                    


                ]
            };
        };

        








        WebMidiInputModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [


                        








            ]});
        };

        return WebMidiInputModuleFactory;
    }
);