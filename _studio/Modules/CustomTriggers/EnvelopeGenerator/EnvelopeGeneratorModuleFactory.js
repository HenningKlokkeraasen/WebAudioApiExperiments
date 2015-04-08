/*
	Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/CustomGenerators/LFO/LfoFacade.js'
    ], function(ModuleFactoryBase, EnvelopeGeneratorFacade) {
		EnvelopeGeneratorModuleFactory.prototype = new ModuleFactoryBase();
		EnvelopeGeneratorModuleFactory.prototype.constructor = EnvelopeGeneratorModuleFactory;

		function EnvelopeGeneratorModuleFactory() {
			this.moduleCssClass = 'genericmodule';
			this.hasNoInputs = true;
			this.hasStartButton = true;
		}
		EnvelopeGeneratorModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : EnvelopeGeneratorFacade,
				parameters : [
					{ func : EnvelopeGeneratorFacade.prototype.setAttackTime, selector : 'input[data-parameterType="attackTime"]', ev : 'input'	},
					{ func : EnvelopeGeneratorFacade.prototype.setDecayTime, selector : 'input[data-parameterType="decayTime"]', ev : 'input' },
					{ func : EnvelopeGeneratorFacade.prototype.setSustainLevel, selector : 'input[data-parameterType="sustainLevel"]', ev : 'input' },
					{ func : EnvelopeGeneratorFacade.prototype.setReleaseTime, selector : 'input[data-parameterType="releaseTime"]', ev : 'input' }


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
		EnvelopeGeneratorModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						{ label : 'A',	type : 'attackTime',	min : 0,	max : 3,	value: 0.2,		step : 0.1,		name : moduleData.shortName + '_attack'	},
		    			{ label : 'D',	type : 'decayTime',		min : 0,	max : 3,	value: 0.7,		step : 0.1,		name : moduleData.shortName + '_decay'	},
		    			{ label : 'S',	type : 'sustainLevel',	min : 0,	max : 1,	value: 0.6,		step : 0.1,		name : moduleData.shortName + '_sustain'	},
		    			{ label : 'R',	type : 'releaseTime',	min : 0,	max : 3,	value: 0.5,		step : 0.1,		name : moduleData.shortName + '_release'	}
					], 




					rangeDisplayMode : 'slider-vertical'
		    }]});
		};

        return EnvelopeGeneratorModuleFactory;
    }
);
