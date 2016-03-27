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
			this.moduleCssClass = 'module-1hp';
            //this.hasNoOutputs = true; - output can be put in analyser node
            
        }
        MasterSectionModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : MasterSectionFacade,
                parameters : [
                    { func : MasterSectionFacade.prototype.setGain,         selector : 'webaudio-knob[data-parameterType="input_trim"]',     ev : 'change'     }
                ]
            };
        };
		
        MasterSectionModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ { 
                    ranges : [
                        { label : 'Gain/Trim',  type : 'input_trim',          min : 0,    max : 2,    value: 1,       step : 0.1,    name : moduleData.shortName + '_gain' }

                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'
                    }
			]});
        };

        return MasterSectionModuleFactory;
    }
);
