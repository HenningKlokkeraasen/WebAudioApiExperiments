define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Gain/GainFacade.js'
    ], function(ModuleFactoryBase, GainFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        GainModuleFactory.prototype = new ModuleFactoryBase();
        GainModuleFactory.prototype.constructor = GainModuleFactory;

        function GainModuleFactory() {
            this.moduleCssClass = 'gain';
            
            
        }
        GainModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : GainFacade,
                parameters : [
                    { func : GainFacade.prototype.setGain,              selector : 'input[data-parameterType="gain"]',          ev : 'input'   }
                

                    


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
                sections : [ {
                    ranges : [
                        this.getRangeControlData({ label : 'G',     type : 'gain',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })
                        


                    ]




            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return GainModuleFactory;
    }
);