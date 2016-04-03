define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/AudioBuses/PatchBay/PatchBayFacade.js'
    ], function(ModuleFactoryBase, PatchBayFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        PatchBayModuleFactory.prototype = new ModuleFactoryBase();
        PatchBayModuleFactory.prototype.constructor = PatchBayModuleFactory;

        function PatchBayModuleFactory() {
            this.headerCssClass = 'patchBay';
			this.moduleCssClass = 'module-4hp';
            this.hasTriggerIn = true;
            // this.hasControlIn = true;
			// this.hasControlOut = true;
        }
        PatchBayModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : PatchBayFacade,
                parameters : [
                    // { func : GainFacade.prototype.setGain,              selector : 'input[data-parameterType="gain"]',          ev : 'input'   }
                

                    


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
        PatchBayModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        // this.getRangeControlData({ label : 'Gain',     type : 'gain',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })
                        


                    ],
                    // rangeDisplayMode : 'knob'



            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return PatchBayModuleFactory;
    }
);