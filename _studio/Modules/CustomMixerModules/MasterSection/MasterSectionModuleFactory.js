/*
	Factory for master section (of a mixer) modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/CustomMixerModules/MasterSection/MasterSectionFacade.js'
    ], function(ModuleFactoryBase, MasterSectionFacade) {
        MasterSectionModuleFactory.prototype = new ModuleFactoryBase();
        MasterSectionModuleFactory.prototype.constructor = MasterSectionModuleFactory;

        function MasterSectionModuleFactory() {
            this.moduleCssClass = 'mastersectionmodule';
            //this.hasNoOutputs = true; - output can be put in analyser node
            
        }
        MasterSectionModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : MasterSectionFacade,
                parameters : [
                    { func : MasterSectionFacade.prototype.setGain,         selector : 'input[data-parameterType="input_trim"]',     ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setThreshold,    selector : 'input[data-parametertype="threshold"]',      ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setKnee,         selector : 'input[data-parametertype="knee"]',           ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setRatio,        selector : 'input[data-parametertype="ratio"]',          ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setReduction,    selector : 'input[data-parametertype="reduction"]',      ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setAttack,       selector : 'input[data-parametertype="attack"]',         ev : 'input'     },
                    { func : MasterSectionFacade.prototype.setRelease,      selector : 'input[data-parametertype="release"]',        ev : 'input'     }
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
        MasterSectionModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
                sections : [ { sectionName : 'Input',
                    ranges : [
                        { label : 'I',  type : 'input_trim',          min : 0,    max : 1,    value: 1,       step : 0.1,    name : moduleData.shortName + '_gain' }

                    ],
                    rangeDisplayMode : 'knob'
                    }, { sectionName : 'Compressor',
                    ranges : [
                        { label : 'T',  type : 'threshold',     min : -100, max : 0,    value: -24,     step : 1,       name : moduleData.shortName + '_thresh' },
                        { label : 'K',  type : 'knee',          min : 0,    max : 40,   value: 30,      step : 1,       name : moduleData.shortName + '_knee'       },
                        { label : 'R',  type : 'ratio',         min : 1,    max : 20,   value: 12,      step : 1,       name : moduleData.shortName + '_ratio'  },
                        { label : 'R',  type : 'reduction',     min : -20,  max : 0,    value: 0,       step : 1,       name : moduleData.shortName + '_reduct' },
                        { label : 'A',  type : 'attack',        min : 0,    max : 1,    value: 0.003,   step : 0.001,   name : moduleData.shortName + '_attack' },
                        { label : 'R',  type : 'release',       min : 0,    max : 4,    value: 0.25,    step : 0.01,    name : moduleData.shortName + '_release'    }
                    ],
                    rangeDisplayMode : 'knob'
            }]});
        };

        return MasterSectionModuleFactory;
    }
);
