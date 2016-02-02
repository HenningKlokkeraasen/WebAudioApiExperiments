/*
	Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGeneratorFacade.js'
    ], function(ModuleFactoryBase, EnvelopeGeneratorFacade) {
		EnvelopeGeneratorModuleFactory.prototype = new ModuleFactoryBase();
		EnvelopeGeneratorModuleFactory.prototype.constructor = EnvelopeGeneratorModuleFactory;

		function EnvelopeGeneratorModuleFactory() {
			this.headerCssClass = 'egmodule';
			this.hasAudioIn = false;
			this.hasAudioOut = false;
			this.hasTriggerIn = true;
			this.hasTriggerOut = true;
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
		// 		a_params
		//			min
		//			max
		//			val
		//			stp
		// 		d_params
		// 		s_params
		// 		r_params
		EnvelopeGeneratorModuleFactory.prototype.getModule = function(moduleData) {
			var ranges = [];
			if (moduleData.a_params)
				ranges.push(
					{ label : 'A',	type : 'attackTime',	min : moduleData.a_params.min, max : moduleData.a_params.max, value: moduleData.a_params.val, step : moduleData.a_params.stp, name : moduleData.shortName + '_attack'	}
				);
			if (moduleData.d_params)
				ranges.push(
					{ label : 'D',	type : 'decayTime',		min : moduleData.d_params.min, max : moduleData.d_params.max, value: moduleData.d_params.val, step : moduleData.d_params.stp, name : moduleData.shortName + '_decay'	}
				);
			if (moduleData.s_params)
				ranges.push(
					{ label : 'S',	type : 'sustainLevel',	min : moduleData.s_params.min, max : moduleData.s_params.max, value: moduleData.s_params.val, step : moduleData.s_params.stp, name : moduleData.shortName + '_sustain'	}
				);
			if (moduleData.r_params)
				ranges.push(
					{ label : 'R',	type : 'releaseTime',	min : moduleData.r_params.min, max : moduleData.r_params.max, value: moduleData.r_params.val, step : moduleData.r_params.stp, name : moduleData.shortName + '_release'	}
				);

			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					ranges : ranges,
					rangeDisplayMode : 'slider-vertical'
		    }]});
		};

        return EnvelopeGeneratorModuleFactory;
    }
);
