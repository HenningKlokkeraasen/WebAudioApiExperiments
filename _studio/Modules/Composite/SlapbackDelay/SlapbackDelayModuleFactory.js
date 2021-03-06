/*
	Factory for slapback delay modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/Composite/SlapbackDelay/SlapbackDelayFacade.js'
    ], function(ModuleFactoryBase, SlapbackDelayFacade) {
        SlapbackDelayModuleFactory.prototype = new ModuleFactoryBase();
        SlapbackDelayModuleFactory.prototype.constructor = SlapbackDelayModuleFactory;

        function SlapbackDelayModuleFactory() {
            this.headerCssClass = 'effectsmodule';
            
            
        }
        SlapbackDelayModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : SlapbackDelayFacade,
                parameters : [
                // delay shouldnt change continously. bind to change instead of input
                    { func: SlapbackDelayFacade.prototype.setDelayTime, selector: 'webaudio-knob[data-parameterType="delayTime"]',      ev: 'change'     },
                    { func: SlapbackDelayFacade.prototype.setFeedback,  selector: 'webaudio-knob[data-parameterType="feedback"]',       ev: 'change'     },
                    { func: SlapbackDelayFacade.prototype.setWetLevel,  selector: 'webaudio-knob[data-parameterType="wetLevel"]',       ev: 'change'     }
                    


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
        SlapbackDelayModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        { label : 'Delay Time',  type : 'delayTime', min : 0,    max : 1,        value: 0.15,    step : 0.01,    name : moduleData.shortName + '_gain'       },
                        { label : 'Feedback',  type : 'feedback',  min : 0,    max : 1,        value: 0.25,    step : 0.01,    name : moduleData.shortName + '_fb'         },
                        { label : 'Wet Level',  type : 'wetLevel',  min : 0,    max : 2,        value: 0.25,    step : 0.01,    name : moduleData.shortName + '_wl'         }

                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'



            }]});
        };

        return SlapbackDelayModuleFactory
    }
);