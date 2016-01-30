define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Analyser/AnalyserFacade.js'
    ], function(ModuleFactoryBase, AnalyserFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        AnalyserModuleFactory.prototype = new ModuleFactoryBase();
        AnalyserModuleFactory.prototype.constructor = AnalyserModuleFactory;

        function AnalyserModuleFactory() {
            this.handlebarsTemplateSelector = '#analyserTemplate'; // differs from norm
            this.moduleCssClass = 'module-2u analysermodule';
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
        //		hasOscilloscope
        //		hasFsa
        //
        //
        //
        //
        AnalyserModuleFactory.prototype.getModule = function(moduleData) {
            var module = this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
				







            });
			module.hasOscilloscope = moduleData.hasOscilloscope;
			module.hasFsa = moduleData.hasFsa;
			return module;
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return AnalyserModuleFactory;
    }
);