define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Analyser/AnalyserFacade.js'
    ], function(ModuleFactoryBase, AnalyserFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        AnalyserModuleFactory.prototype = new ModuleFactoryBase();
        AnalyserModuleFactory.prototype.constructor = AnalyserModuleFactory;

        function AnalyserModuleFactory() {
            this.handlebarsTemplateSelector = '#analyserTemplate'; // differs from norm
            this.moduleCssClass = 'analysermodule';
            this.hasAudioOut = false;
            this.hasStartButton = true;
        }
        AnalyserModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : AnalyserFacade,
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
        AnalyserModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 











            });
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return AnalyserModuleFactory;
    }
);