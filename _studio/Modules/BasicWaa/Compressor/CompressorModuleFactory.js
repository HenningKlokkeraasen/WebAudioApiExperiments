define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Compressor/CompressorFacade.js'
    ], function(ModuleFactoryBase, CompressorFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        CompressorModuleFactory.prototype = new ModuleFactoryBase();
        CompressorModuleFactory.prototype.constructor = CompressorModuleFactory;

        function CompressorModuleFactory() {
            this.headerCssClass = 'compressor';
            
            
        }
        CompressorModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : CompressorFacade,
        		parameters : [
        			{ func: CompressorFacade.prototype.setThreshold,	selector: 'webaudio-knob[data-parametertype="threshold"]',		ev: 'change'		},
        			{ func: CompressorFacade.prototype.setKnee,			selector: 'webaudio-knob[data-parametertype="knee"]',			ev: 'change'		},
        			{ func: CompressorFacade.prototype.setRatio,		selector: 'webaudio-knob[data-parametertype="ratio"]',			ev: 'change'		},
        			{ func: CompressorFacade.prototype.setReduction,	selector: 'webaudio-knob[data-parametertype="reduction"]',		ev: 'change'		},
        			{ func: CompressorFacade.prototype.setAttack,		selector: 'webaudio-knob[data-parametertype="attack"]',			ev: 'change'		},
        			{ func: CompressorFacade.prototype.setRelease,		selector: 'webaudio-knob[data-parametertype="release"]',		ev: 'change'		}
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
        CompressorModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : CompressorModuleFactory.prototype.getRanges(moduleData),
                    rangeDisplayMode : 'webaudio-controls-color_knob'

            }]});
        };
		CompressorModuleFactory.prototype.getRanges = function(moduleData) {
			return [
                		{ label : 'Threshold',  type : 'threshold',     min : -100, max : 0,    value: -24,     step : 1,       name : moduleData.shortName + '_thresh' },
                        { label : 'Knee',  type : 'knee',          min : 0,    max : 40,   value: 30,      step : 1,       name : moduleData.shortName + '_knee'       },
                        { label : 'Ratio',  type : 'ratio',         min : 1,    max : 20,   value: 12,      step : 1,       name : moduleData.shortName + '_ratio'  },
                        { label : 'Reduction',  type : 'reduction',     min : -20,  max : 0,    value: 0,       step : 1,       name : moduleData.shortName + '_reduct' },
                        { label : 'Attack',  type : 'attack',        min : 0,    max : 1,    value: 0.003,   step : 0.001,   name : moduleData.shortName + '_attack' },
                        { label : 'Release',  type : 'release',       min : 0,    max : 4,    value: 0.25,    step : 0.01,    name : moduleData.shortName + '_release'    }
                    ];
		}
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return CompressorModuleFactory
    }
);