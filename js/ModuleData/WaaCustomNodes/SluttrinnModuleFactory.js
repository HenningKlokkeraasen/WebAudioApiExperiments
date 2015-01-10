
/*


	Factory for sluttrinn modules


*/

SluttrinnModuleFactory.prototype = new ModuleFactoryBase();
SluttrinnModuleFactory.prototype.constructor = SluttrinnModuleFactory;

function SluttrinnModuleFactory() {
    this.moduleCssClass = 'sluttrinnmodule';
    //this.hasNoOutputs = true; - output can be put in analyser node
    
}
SluttrinnModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : SluttrinnFacade,
        parameters : [
            { func : SluttrinnFacade.prototype.setGain,         selector : 'input[data-parameterType="gain"]',           ev : 'input'     },
            { func : SluttrinnFacade.prototype.setThreshold,    selector : 'input[data-parametertype="threshold"]',      ev : 'input'     },
            { func : SluttrinnFacade.prototype.setKnee,         selector : 'input[data-parametertype="knee"]',           ev : 'input'     },
            { func : SluttrinnFacade.prototype.setRatio,        selector : 'input[data-parametertype="ratio"]',          ev : 'input'     },
            { func : SluttrinnFacade.prototype.setReduction,    selector : 'input[data-parametertype="reduction"]',      ev : 'input'     },
            { func : SluttrinnFacade.prototype.setAttack,       selector : 'input[data-parametertype="attack"]',         ev : 'input'     },
            { func : SluttrinnFacade.prototype.setRelease,      selector : 'input[data-parametertype="release"]',        ev : 'input'     }
        ]
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
SluttrinnModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ { sectionName : 'Gain',
            ranges : [
                { label : 'G',  type : 'gain',          min : 0,    max : 1,    value: 1,       step : 0.1,    name : moduleData.shortName + '_gain' }

            ] }, { sectionName : 'Compressor',
            ranges : [
                { label : 'T',  type : 'threshold',     min : -100, max : 0,    value: -24,     step : 1,       name : moduleData.shortName + '_thresh' },
                { label : 'K',  type : 'knee',          min : 0,    max : 40,   value: 30,      step : 1,       name : moduleData.shortName + '_knee'       },
                { label : 'R',  type : 'ratio',         min : 1,    max : 20,   value: 12,      step : 1,       name : moduleData.shortName + '_ratio'  },
                { label : 'R',  type : 'reduction',     min : -20,  max : 0,    value: 0,       step : 1,       name : moduleData.shortName + '_reduct' },
                { label : 'A',  type : 'attack',        min : 0,    max : 1,    value: 0.003,   step : 0.001,   name : moduleData.shortName + '_attack' },
                { label : 'R',  type : 'release',       min : 0,    max : 4,    value: 0.25,    step : 0.01,    name : moduleData.shortName + '_release'    }
            ]
    }]});
};
