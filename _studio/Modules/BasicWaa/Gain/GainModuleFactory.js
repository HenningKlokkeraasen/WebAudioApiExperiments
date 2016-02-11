define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js'
    ], function(ModuleFactoryBase, GainFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        GainModuleFactory.prototype = new ModuleFactoryBase();
        GainModuleFactory.prototype.constructor = GainModuleFactory;

        function GainModuleFactory() {
            this.headerCssClass = 'gain';
			this.moduleCssClass = 'weave';
            this.hasTriggerIn = true;
            this.hasControlIn = true;
        }
        GainModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : GainFacade,
                parameters : [
                    { func : GainFacade.prototype.setGain,              selector : 'webaudio-knob[data-parameterType="gain"]',          ev : 'change'   }
                

                    


                ]
            };
        };
        // moduleData
        //      name
        //      shortName
        //      g_params
        //          min
        //          max
        //          val
        //          stp
        // 
        //  
        GainModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        this.getRangeControlData({ label : 'Gain',     type : 'gain',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })
                        


                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'



            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return GainModuleFactory;
    }
);