/*
    Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancockFacade.js'
    ], function(ModuleFactoryBase, QwertyHancockFacade) {

        QwertyHancockModuleFactory.prototype = new ModuleFactoryBase();
        QwertyHancockModuleFactory.prototype.constructor = QwertyHancockModuleFactory;

        function QwertyHancockModuleFactory() {
            this.moduleCssClass = 'wideModule';
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasControlOut = true;
            this.hasKeyboardInterface = true;
        }
        QwertyHancockModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : QwertyHancockFacade,
                parameters : [
                    
                

                    


                ]
            };
        };

        








        QwertyHancockModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
                sections : [ 
                    




              





            ]});
        };

        return QwertyHancockModuleFactory;
    }
);