define([
    'Modules/_ModuleFactoryBase',
    'Modules/AudioBuses/PatchBay/PatchBayFacade'
    ], function(ModuleFactoryBase, PatchBayFacade) {
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

        return PatchBayModuleFactory;
    }
);