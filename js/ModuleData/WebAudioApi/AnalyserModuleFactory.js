
/*


	Factory for Analyser


*/

AnalyserModuleFactory.prototype = new ModuleFactoryBase();
AnalyserModuleFactory.prototype.constructor = AnalyserModuleFactory;

function AnalyserModuleFactory() {
    this.handlebarsTemplateSelector = '#analyserTemplate'; // differs from norm
    this.moduleCssClass = 'analysermodule';
    this.hasNoOutputs = true;
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
