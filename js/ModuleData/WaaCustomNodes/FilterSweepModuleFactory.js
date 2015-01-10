
/*


	Factory for Filter Sweep modules


*/

FilterSweepModuleFactory.prototype = new ModuleFactoryBase();
FilterSweepModuleFactory.prototype.constructor = FilterSweepModuleFactory;

function FilterSweepModuleFactory() {
    this.moduleCssClass = 'effectsmodule';
    // this.renderSectionsVertically = true;
    
}
FilterSweepModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : FilterSweepFacade,
        parameters : [
            { func : FilterSweepFacade.prototype.setLfoRate,            selector : 'input[data-parameterType="lfo_rate"]',      ev : 'input'    },
            { func : FilterSweepFacade.prototype.setLfoWaveType,        selector : 'input[data-parameterType="lfo_wavetype"]',  ev : 'change'   },
            { func : FilterSweepFacade.prototype.setLfoGain,            selector : 'input[data-parameterType="lfo_depth"]',      ev : 'input'    },
            { func : FilterSweepFacade.prototype.setFilterType,         selector : 'select[data-parameterType="filterType"]',   ev : 'change'   },
            { func : FilterSweepFacade.prototype.setFrequencyByScale,   selector: 'input[data-parameterType="filter_f"]',      ev: 'input'     },
            { func : FilterSweepFacade.prototype.setFilterQuality,      selector : 'input[data-parameterType="filter_q"]',      ev : 'input'    },
            { func : FilterSweepFacade.prototype.setFilterGain,         selector : 'input[data-parameterType="filter_g"]',      ev : 'input'    }
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
FilterSweepModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ { sectionName : 'LFO',
            ranges : [
                    { label : 'R',  type : 'lfo_rate',  min : 0,  max : 20,        value: 1.9,     step : 0.01,        name : moduleData.shortName + '_LR'    },
                    { label : 'D',  type : 'lfo_depth',  min : 0,    max : 500,      value: 280,     step : 1,           name : moduleData.shortName + '_LG'    }
            ],
            radioButtonLists : [
                ModuleFactoryBase.prototype.getWaveTypeSelectObject('W', 'lfo_wavetype', moduleData.shortName + '_LW', 0)
            ] }, { sectionName : 'Filter',
            ranges : [
                { label : 'F',  type : 'filter_f',     min : 0,    max : 1,    value: 0.5,    step : 0.01,    name : moduleData.shortName + '_f'  }, 
                { label : 'Q',  type : 'filter_q',  min : 0,    max : 1,        value: 0.6,     step : 0.01,        name : moduleData.shortName + '_FQ'    }, 
                { label : 'G',  type : 'filter_g',  min : -4,   max : 4,        value: 0,       step : 0.01,        name : moduleData.shortName + '_FG'    }
            ], 
            selectLists : [
                ModuleFactoryBase.prototype.getFilterTypeSelectData('T', 'filterType', 0)
            ]
    }]});
};
