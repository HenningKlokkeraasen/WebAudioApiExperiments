
/*


	Factory for AudioDestinationModule


*/

AudioDestinationModuleFactory.prototype = new ModuleFactoryBase();
AudioDestinationModuleFactory.prototype.constructor = AudioDestinationModuleFactory;

function AudioDestinationModuleFactory() {
    this.moduleCssClass = 'audioContextDestination';
    this.hasNoOutputs = true;
    
}
AudioDestinationModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,

		parameters : [





		],
		doNotCreateFacadeInstance : true
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
