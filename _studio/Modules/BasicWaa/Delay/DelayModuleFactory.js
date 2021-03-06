define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Delay/DelayFacade.js'
    ], function(ModuleFactoryBase, DelayFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        DelayModuleFactory.prototype = new ModuleFactoryBase();
        DelayModuleFactory.prototype.constructor = DelayModuleFactory;

        function DelayModuleFactory() {
            this.headerCssClass = 'delay';
			this.moduleCssClass = 'module-1hp';
            
        }
        DelayModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : DelayFacade,
                parameters : [
                // delay shouldnt change continously. bind to change instead of input
        			{ func : DelayFacade.prototype.setDelayTime, 	selector : 'webaudio-knob[data-parameterType="delayTime"]',			ev : 'change'    }
                

                    


                ]
            };
        };
        // moduleData
        //      name
        //      shortName
        //      d_params
        //          min
        //          max
        //          val
        //          stp
        // 
        //  
        DelayModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name,
				shortName : moduleData.shortName, 
                sections : [ {
                    ranges : [
                        this.getRangeControlData({ label : 'Delay time',     type : 'delayTime',	params : moduleData.d_params,  name : moduleData.shortName + '_delay' })
                        


                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'



            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return DelayModuleFactory;
    }
);