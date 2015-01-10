
/*


	Factory for mixer (strip) modules


*/

MixerStripModuleFactory.prototype = new ModuleFactoryBase();
MixerStripModuleFactory.prototype.constructor = MixerStripModuleFactory;

function MixerStripModuleFactory() {
    this.moduleCssClass = 'mixermodule';
    
    
}
MixerStripModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : MixerFacade,
        parameters : [
			{ func: MixerFacade.prototype.setGainLevel,			selector: 'input[data-parameterType="gain"]',			ev: 'input'		},
			{ func: MixerFacade.prototype.setLeftLevel,			selector: 'input[data-parameterType="left"]',			ev: 'input'		},
			{ func: MixerFacade.prototype.setRightLevel,		selector: 'input[data-parameterType="right"]',			ev: 'input'		},



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
MixerStripModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ {
            ranges : [
    			{ label : 'G',		type : 'gain',		min : 0,	max : 2,	value: 1,	step : 0.1,	name : moduleData.shortName + '_gain'	},
    			{ label : 'L',		type : 'left',		min : 0,	max : 1,	value: 1,	step : 0.1,	name : moduleData.shortName + '_left'	},
    			{ label : 'R',		type : 'right',		min : 0,	max : 1,	value: 1,	step : 0.1,	name : moduleData.shortName + '_right'	},
            ],

            



    }]});
};
