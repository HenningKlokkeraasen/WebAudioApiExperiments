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
                    { func : AnalyserFacade.prototype.toggleStartStop, selector: 'button[data-parameterType="togglestartstop"]', 
                        ev: 'click', doNotInitOnRender: true, textWhenOff: 'Start', textWhenOn: 'Stop'}
                ],
            };
        };

        AnalyserModuleFactory.prototype.getModule = function(moduleData) {
            var module = this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections: [{
                    buttons: [
                        {
                            buttonId: moduleData.shortName + '_start', buttonName: 'Start', 
                            buttonLabel: '', buttonCssClass: 'round', type: 'togglestartstop'
                        }],
                }]
            });
			module.hasOscilloscope = moduleData.hasOscilloscope;
			module.hasFsa = moduleData.hasFsa;
			return module;
        };

        return AnalyserModuleFactory;
    }
);