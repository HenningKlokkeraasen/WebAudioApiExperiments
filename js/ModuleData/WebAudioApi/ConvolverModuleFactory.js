
/*


	Factory for convolver modules


*/

ConvolverModuleFactory.prototype = new ModuleFactoryBase();
ConvolverModuleFactory.prototype.constructor = ConvolverModuleFactory;

function ConvolverModuleFactory() {
    this.moduleCssClass = 'convolver';
    
    
}
ConvolverModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : ConvolverFacade,
        parameters : [
			{ func: ConvolverFacade.prototype.setImpulse,		selector: 'select[data-parametertype="impulse"]',		ev: 'change'	}





        ]
    };
};
// moduleData
//      name
//      shortName
//		impulseOptions
//
//
//
//
//
//
ConvolverModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ {
            ranges : [
                { label : 'F',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  }, 
                { label : 'Q',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  }, 
                { label : 'G',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  }

            ],
            
            selectLists : [
                { label : 'I',	type : 'impulse', 		options: moduleData.impulseOptions }
            ]
    }]});
};
