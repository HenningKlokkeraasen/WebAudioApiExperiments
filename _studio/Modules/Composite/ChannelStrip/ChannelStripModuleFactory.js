/*
	Factory for mixer channel strip modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/Composite/ChannelStrip/ChannelStripFacade.js'
    ], function(ModuleFactoryBase, ChannelStripFacade) {
        ChannelStripModuleFactory.prototype = new ModuleFactoryBase();
        ChannelStripModuleFactory.prototype.constructor = ChannelStripModuleFactory;

        function ChannelStripModuleFactory() {
            this.moduleCssClass = 'mixermodule';
            
            
        }
        ChannelStripModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : ChannelStripFacade,
                parameters : [
                    { func: ChannelStripFacade.prototype.setGainLevel,         selector: 'input[data-parameterType="gain"]',           ev: 'input'     },
                    { func: ChannelStripFacade.prototype.setLeftLevel,         selector: 'input[data-parameterType="left"]',           ev: 'input'     },
                    { func: ChannelStripFacade.prototype.setRightLevel,        selector: 'input[data-parameterType="right"]',          ev: 'input'     },



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
        ChannelStripModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        { label : 'G',      type : 'gain',      min : 0,    max : 2,    value: 1,   step : 0.1, name : moduleData.shortName + '_gain'   },
                        { label : 'L',      type : 'left',      min : 0,    max : 1,    value: 1,   step : 0.1, name : moduleData.shortName + '_left'   },
                        { label : 'R',      type : 'right',     min : 0,    max : 1,    value: 1,   step : 0.1, name : moduleData.shortName + '_right'  },
                    ],
                    rangeDisplayMode : 'knob'
                    



            }]});
        };

        return ChannelStripModuleFactory;
    }
);
