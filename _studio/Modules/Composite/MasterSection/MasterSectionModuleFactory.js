/*
	Factory for master section (of a mixer) modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Compressor/CompressorModuleFactory.js',
    '/_studio/Modules/Composite/MasterSection/MasterSectionFacade.js'
    ], function(ModuleFactoryBase, CompressorModuleFactory, MasterSectionFacade) {
        MasterSectionModuleFactory.prototype = new ModuleFactoryBase();
        MasterSectionModuleFactory.prototype.constructor = MasterSectionModuleFactory;

        function MasterSectionModuleFactory() {
            this.headerCssClass = 'mastersectionmodule';
            //this.hasNoOutputs = true; - output can be put in analyser node
            
        }
        MasterSectionModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : MasterSectionFacade,
                parameters : [
                    { func : MasterSectionFacade.prototype.setGain,         selector : 'webaudio-knob[data-parameterType="input_trim"]',     ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setThreshold,    selector : 'webaudio-knob[data-parametertype="threshold"]',      ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setKnee,         selector : 'webaudio-knob[data-parametertype="knee"]',           ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setRatio,        selector : 'webaudio-knob[data-parametertype="ratio"]',          ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setReduction,    selector : 'webaudio-knob[data-parametertype="reduction"]',      ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setAttack,       selector : 'webaudio-knob[data-parametertype="attack"]',         ev : 'change'     },
                    { func : MasterSectionFacade.prototype.setRelease,      selector : 'webaudio-knob[data-parametertype="release"]',        ev : 'change'     }
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
				shortName : moduleData.shortName,
                sections : [ { sectionName : 'Input',
                    ranges : [
                        { label : 'Trim',  type : 'input_trim',          min : 0,    max : 1,    value: 1,       step : 0.1,    name : moduleData.shortName + '_gain' }

                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'
                    }, { sectionName : 'Compressor',
                    ranges : CompressorModuleFactory.prototype.getRanges(moduleData),
                    rangeDisplayMode : 'webaudio-controls-color_knob'
            }]});
        };

        return MasterSectionModuleFactory;
    }
);
