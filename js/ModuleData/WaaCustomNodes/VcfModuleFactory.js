
/*


	Factory for VCF modules


*/

VcfModuleFactory.prototype = new ModuleFactoryBase();
VcfModuleFactory.prototype.constructor = VcfModuleFactory;

function VcfModuleFactory() {
    this.moduleCssClass = 'genericmodule';
    
    
}
VcfModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        containerSelector : '#vcfContainer',
        facade : VcfFacade,
        parameters : [
            { func : VcfFacade.prototype.setLfoRate,            selector : 'input[data-parameterType="lfo_rate"]',      ev : 'input'    },
            { func : VcfFacade.prototype.setLfoWaveType,        selector : 'input[data-parameterType="lfo_wavetype"]',  ev : 'change'   },
            { func : VcfFacade.prototype.setLfoGain,            selector : 'input[data-parameterType="lfo_gain"]',      ev : 'input'    },
            { func : VcfFacade.prototype.setFilterType,         selector : 'select[data-parameterType="filterType"]',   ev : 'change'   },
            { func : VcfFacade.prototype.setFrequencyByScale,   selector: 'input[data-parameterType="filter_f"]',      ev: 'input'     },
            { func : VcfFacade.prototype.setFilterQuality,      selector : 'input[data-parameterType="filter_q"]',      ev : 'input'    },
            { func : VcfFacade.prototype.setFilterGain,         selector : 'input[data-parameterType="filter_g"]',      ev : 'input'    }
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
VcfModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
				shortName : moduleData.shortName,
        sections : [ { sectionName : 'Filter',
            ranges : [
                { label : 'F',  type : 'filter_f',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  }, 
                { label : 'Q',  type : 'filter_q',  min : 0,    max : 1,        value: 0,       step : 0.01,        name : moduleData.shortName + '_FQ'    }, 
                { label : 'G',  type : 'filter_g',  min : -4,   max : 4,        value: 0,       step : 0.01,        name : moduleData.shortName + '_FG'    }
            ], 
            selectLists : [
                ModuleFactoryBase.prototype.getFilterTypeSelectData('T', 'filterType', 0)
            ] }, { sectionName : 'LFO',
            ranges : [
                    { label : 'R',  type : 'lfo_rate',  min : 0.1,  max : 2,        value: 0.3,     step : 0.01,        name : moduleData.shortName + '_LR'    },
                    { label : 'L',  type : 'lfo_gain',  min : 0,    max : 300,      value: 100,     step : 1,           name : moduleData.shortName + '_LG'    }
            ],
            radioButtonLists : [
                ModuleFactoryBase.prototype.getWaveTypeSelectObject('W', 'lfo_wavetype', 'vcf1_LW', 0)
            ],
    }]});
};
