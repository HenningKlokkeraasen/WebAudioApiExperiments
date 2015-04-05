/*
	Factory for wah-wah (filter sweep) modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/CustomModifiers/WahWah/WahWahFacade.js'
    ], function(ModuleFactoryBase, WahWahFacade) {
        WahWahModuleFactory.prototype = new ModuleFactoryBase();
        WahWahModuleFactory.prototype.constructor = WahWahModuleFactory;

        function WahWahModuleFactory() {
            this.moduleCssClass = 'effectsmodule';
            // this.renderSectionsVertically = true;
            
        }
        WahWahModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : WahWahFacade,
                parameters : [
                    { func : WahWahFacade.prototype.setPreGain,            selector : 'input[data-parameterType="pregain"]',      ev : 'input'    },
                    { func : WahWahFacade.prototype.setLfoRate,            selector : 'input[data-parameterType="lfo_rate"]',      ev : 'input'    },
                    { func : WahWahFacade.prototype.setLfoWaveType,        selector : 'input[data-parameterType="lfo_wavetype"]',  ev : 'change'   },
                    { func : WahWahFacade.prototype.setLfoGain,            selector : 'input[data-parameterType="lfo_depth"]',      ev : 'input'    },
                    { func : WahWahFacade.prototype.setFilterType,         selector : 'select[data-parameterType="filterType"]',   ev : 'change'   },
                    { func : WahWahFacade.prototype.setFrequencyByScale,   selector: 'input[data-parameterType="filter_f"]',      ev: 'input'     },
                    { func : WahWahFacade.prototype.setFilterQuality,      selector : 'input[data-parameterType="filter_q"]',      ev : 'input'    },
                    { func : WahWahFacade.prototype.setFilterGain,         selector : 'input[data-parameterType="filter_g"]',      ev : 'input'    }
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
        WahWahModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
                sections : [ { sectionName : 'Input',
                    ranges : [
                        { label : 'P',  type : 'pregain',   min : -2,   max : 2,        value: 1,       step : 0.01,        name : moduleData.shortName + '_P'  }
                    ] }, { sectionName : 'LFO',
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

        return WahWahModuleFactory;
    }
);