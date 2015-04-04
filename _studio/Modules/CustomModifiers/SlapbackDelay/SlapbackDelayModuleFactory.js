/*
	Factory for slapback delay modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/CustomModifiers/SlapbackDelay/SlapbackDelayFacade.js'
    ], function(ModuleFactoryBase, SlapbackDelayFacade) {
        SlapbackDelayModuleFactory.prototype = new ModuleFactoryBase();
        SlapbackDelayModuleFactory.prototype.constructor = SlapbackDelayModuleFactory;

        function SlapbackDelayModuleFactory() {
            this.moduleCssClass = 'effectsmodule';
            
            
        }
        SlapbackDelayModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : SlapbackDelayFacade,
                parameters : [
                    { func: SlapbackDelayFacade.prototype.setDelayTime, selector: 'input[data-parameterType="delayTime"]',      ev: 'input'     },
                    { func: SlapbackDelayFacade.prototype.setFeedback,  selector: 'input[data-parameterType="feedback"]',       ev: 'input'     },
                    { func: SlapbackDelayFacade.prototype.setWetLevel,  selector: 'input[data-parameterType="wetLevel"]',       ev: 'input'     }
                    


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
                sections : [ {
                    ranges : [
                        { label : 'D',  type : 'delayTime', min : 0,    max : 1,        value: 0.15,    step : 0.01,    name : moduleData.shortName + '_gain'       },
                        { label : 'F',  type : 'feedback',  min : 0,    max : 1,        value: 0.25,    step : 0.01,    name : moduleData.shortName + '_fb'         },
                        { label : 'W',  type : 'wetLevel',  min : 0,    max : 2,        value: 0.25,    step : 0.01,    name : moduleData.shortName + '_wl'         }

                    ]




            }]});
        };

        return SlapbackDelayModuleFactory
    }
);