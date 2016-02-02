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
        			{ func: CompressorFacade.prototype.setThreshold,	selector: 'input[data-parametertype="threshold"]',		ev: 'input'		},
        			{ func: CompressorFacade.prototype.setKnee,			selector: 'input[data-parametertype="knee"]',			ev: 'input'		},
        			{ func: CompressorFacade.prototype.setRatio,		selector: 'input[data-parametertype="ratio"]',			ev: 'input'		},
        			{ func: CompressorFacade.prototype.setReduction,	selector: 'input[data-parametertype="reduction"]',		ev: 'input'		},
        			{ func: CompressorFacade.prototype.setAttack,		selector: 'input[data-parametertype="attack"]',			ev: 'input'		},
        			{ func: CompressorFacade.prototype.setRelease,		selector: 'input[data-parametertype="release"]',		ev: 'input'		}
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
                    ranges : [
                		{ label : 'T',	type : 'threshold',		min : -100,	max : 0,	value: -24,		step : 1, 		name : moduleData.shortName + '_thresh'	},
                		{ label : 'K',	type : 'knee',			min : 0,	max : 40,	value: 30,		step : 1,		name : moduleData.shortName + '_knee'		},
                		{ label : 'R',	type : 'ratio',			min : 1,	max : 20,	value: 12,		step : 1,		name : moduleData.shortName + '_ratio'	},
                		{ label : 'R',	type : 'reduction',		min : -20,	max : 0,	value: 0,		step : 1,		name : moduleData.shortName + '_reduct'	},
                		{ label : 'A',	type : 'attack',		min : 0,	max : 1,	value: 0.003,	step : 0.001,	name : moduleData.shortName + '_attack'	},
                		{ label : 'R',	type : 'release',		min : 0,	max : 4,	value: 0.25,	step : 0.01,	name : moduleData.shortName + '_release'	}
                    ],
                    rangeDisplayMode : 'knob'

            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return CompressorModuleFactory
    }
);