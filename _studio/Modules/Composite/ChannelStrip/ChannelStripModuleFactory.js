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
            this.headerCssClass = 'mixermodule';
            
            
        }
        ChannelStripModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : ChannelStripFacade,
                parameters : [
                    { func: ChannelStripFacade.prototype.setGainLevel,         selector: 'webaudio-knob[data-parameterType="gain"]',           ev: 'change'     },
                    { func: ChannelStripFacade.prototype.setLeftRightPanLevel,         selector: 'webaudio-knob[data-parameterType="left"]',           ev: 'change'     }



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
                        { label : 'Gain',      type : 'gain',      min : 0,    max : 2,    value: 1,   step : 0.1, name : moduleData.shortName + '_gain'   }
                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'
					},
					{
                    ranges : [
                        { label : 'L/R Pan',      type : 'left',      min : -1,    max : 1,    value: 0,   step : 0.1, name : moduleData.shortName + '_leftrightpan'   }
                    ],
                    rangeDisplayMode : 'webaudio-controls-blue-knob'
            }]});
        };

        return ChannelStripModuleFactory;
    }
);
