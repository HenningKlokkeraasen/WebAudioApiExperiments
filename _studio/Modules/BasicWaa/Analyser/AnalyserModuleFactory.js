define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Analyser/AnalyserFacade.js'
    ], function(ModuleFactoryBase, AnalyserFacade) {
        AnalyserModuleFactory.prototype = new ModuleFactoryBase();
        AnalyserModuleFactory.prototype.constructor = AnalyserModuleFactory;

        function AnalyserModuleFactory() {
            this.handlebarsTemplateSelector = '#analyserTemplate'; // differs from norm
            this.moduleCssClass = 'module-4hp';
			this.headerCssClass = 'analysermodule';
            this.hasAudioOut = false;
        }
        AnalyserModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : AnalyserFacade,
                parameters : [
                    this.getStartStopButtonParameter(AnalyserFacade.prototype.toggleStartStop)
                ],
            };
        };

        AnalyserModuleFactory.prototype.getModule = function(moduleData) {
            var module = this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections: [{
                    buttons: [
                        this.getStartStopButtonControl(moduleData.shortName)
                    ],
                }]
            });
			module.hasOscilloscope = moduleData.hasOscilloscope;
			module.hasFsa = moduleData.hasFsa;
			return module;
        };

        return AnalyserModuleFactory;
    }
);