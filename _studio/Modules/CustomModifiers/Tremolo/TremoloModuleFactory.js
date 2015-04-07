/*
	Factory for Tremolo modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/CustomModifiers/Tremolo/TremoloFacade.js'
	], function(ModuleFactoryBase, TremoloFacade) {
		TremoloModuleFactory.prototype = new ModuleFactoryBase();
		TremoloModuleFactory.prototype.constructor = TremoloModuleFactory;

		function TremoloModuleFactory() {
			this.moduleCssClass = 'effectsmodule';


		}
		TremoloModuleFactory.prototype.getModuleDefinition = function() {
			return {
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : TremoloFacade,
				parameters : [
					{ func : TremoloFacade.prototype.setPreGain,		selector : 'input[data-parameterType="pregain"]',		ev : 'input'	},
					{ func : TremoloFacade.prototype.setLfoRate,		selector : 'input[data-parameterType="lfo_rate"]',		ev : 'input'	},
					{ func : TremoloFacade.prototype.setLfoDepth,		selector : 'input[data-parameterType="lfo_depth"]',		ev : 'input'	},
					{ func : TremoloFacade.prototype.setLfoWaveType,	selector : 'input[data-parameterType="waveType"]',		ev : 'change'	}


				]
			};
		};
		// moduleData
		// 		name
		// 		shortName
		//
		//
		//
		//
		//
		// 		w_params
		//			indexChecked
		TremoloModuleFactory.prototype.getModule = function(moduleData) {
		    return this.getModuleBase({
		        name : moduleData.name, 
		        sections : [ { sectionName : 'Input',
					ranges : [
						{ label : 'P', 	type : 'pregain', 	min : -2, 	max : 2,		value: 1,	 	step : 0.01,		name : moduleData.shortName + '_P'	}
					],
					rangeDisplayMode : 'knob'
		    },{ sectionName : 'LFO',
					ranges : [
						{ label : 'R', 	type : 'lfo_rate', 	min : 0.1, 	max : 20,		value: 3.3,	 	step : 0.01,		name : moduleData.shortName + '_R'	},
						{ label : 'D', 	type : 'lfo_depth',	min : -10, 	max : 10,		value: 1,	 	step : 0.01,		name : moduleData.shortName + '_D'	}
					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject('W', 'waveType', moduleData.shortName + 'wave', moduleData.w_params.indexChecked)
					],
					rangeDisplayMode : 'knob'
		    }]});
		};

		return TremoloModuleFactory;
	}
);