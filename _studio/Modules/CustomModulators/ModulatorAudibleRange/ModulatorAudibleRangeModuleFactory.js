define([
    '/_studio/Modules/CustomModulators/LFO/LfoModuleFactory.js',
	'/_studio/Modules/CustomModulators/ModulatorAudibleRange/ModulatorAudibleRangeFacade.js'
    ], function(LfoModuleFactory, ModulatorAudibleRangeFacade) {
		ModulatorAudibleRangeModuleFactory.prototype = new LfoModuleFactory();
		ModulatorAudibleRangeModuleFactory.prototype.constructor = ModulatorAudibleRangeModuleFactory;

		function ModulatorAudibleRangeModuleFactory() {
			LfoModuleFactory.call(this);
			// this.hasAudioOut = true;TODO enable to also output audio
		}

		ModulatorAudibleRangeModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : ModulatorAudibleRangeFacade,
				parameters : [
					{ func : ModulatorAudibleRangeFacade.prototype.setRate, 			selector : 'input[data-parameterType="rate"]',			ev : 'input'	},
					{ func : ModulatorAudibleRangeFacade.prototype.setDepth, 			selector : 'input[data-parameterType="depth"]',			ev : 'input'	},
					{ func : ModulatorAudibleRangeFacade.prototype.setShape, 			selector : 'input[data-parameterType="shape"]',			ev : 'change'	}



				]
			};
		};
		// moduleData
		// 		name
		// 		shortName
		// 		f_params
		//			min
		//			max
		//			val
		//			stp
		// 		w_params
		//			indexChecked
		ModulatorAudibleRangeModuleFactory.prototype.getModule = function(moduleData) {
			return LfoModuleFactory.prototype.getModule(moduleData);
		};

        return ModulatorAudibleRangeModuleFactory;
    }
);