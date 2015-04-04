
/*


	Factory for simple reverb modules


*/

SimpleReverbModuleFactory.prototype = new ModuleFactoryBase();
SimpleReverbModuleFactory.prototype.constructor = SimpleReverbModuleFactory;

function SimpleReverbModuleFactory() {
    this.moduleCssClass = 'effectsmodule';
    
    
}
SimpleReverbModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : SimpleReverbFacade,
        parameters : [
			// reverb build impulse is expensive. // bind to change instead of input
			{ func: SimpleReverbFacade.prototype.setSeconds,	selector: 'input[data-parameterType="seconds"]',		ev: 'change'	},
			{ func: SimpleReverbFacade.prototype.seDecay,		selector: 'input[data-parameterType="decay"]',			ev: 'change'	},
			{ func: SimpleReverbFacade.prototype.setReverse,	selector: 'input[data-parameterType="reverse"]',		ev: 'change'	}


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
//  
SimpleReverbModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ {
            ranges : [
        		{ label : 'S', 	type : 'seconds', 	min : 1, 	max : 50,		value: 3, 		step : 1,		name : moduleData.shortName + '_s'		}, 
        		{ label : 'D', 	type : 'decay', 	min : 0, 	max : 100,		value: 2, 		step : 1,		name : moduleData.shortName + '_d'		}

            ],

            
    		checkBoxes : [
    			{ label : 'R',	type : 'reverse' }
    		]
    }]});
};
