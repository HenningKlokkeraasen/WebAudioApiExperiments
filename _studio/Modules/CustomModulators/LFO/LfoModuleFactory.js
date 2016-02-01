define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomModulators/LFO/LfoFacade.js'
    ], function(OscillatorModuleFactory, LfoFacade) {
		LfoModuleFactory.prototype = new OscillatorModuleFactory();
		LfoModuleFactory.prototype.constructor = LfoModuleFactory;

		function LfoModuleFactory() {
			// console.debug('ctor for LfoModuleFactory');
			OscillatorModuleFactory.call(this);
			this.moduleCssClass = 'lfomodule';
			this.hasTriggerIn = false;
			this.hasControlOut = true; //TODO is this implemented?
			this.hasAudioOut = false;
		}
		LfoModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : LfoFacade,
				parameters : [
					{ func : LfoFacade.prototype.setRate, 			selector : 'input[data-parameterType="rate"]',			ev : 'input'	},
					{ func : LfoFacade.prototype.setDepth, 			selector : 'input[data-parameterType="depth"]',			ev : 'input'	},
					{ func : LfoFacade.prototype.setShape, 			selector : 'input[data-parameterType="shape"]',			ev : 'change'	},
					{ func : LfoFacade.prototype.setActsAsModulatorInAudibleRange, selector : 'input[data-parameterType="actsAsModulatorInAudibleRange"]', ev : 'change'}


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
		//		actsAsModulatorInAudibleRange
		LfoModuleFactory.prototype.getModule = function(moduleData) {
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					ranges : [
						this.getRangeControlData({ label : 'Rate',     type : 'rate',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' }),
						this.getRangeControlData({ label : 'Depth',     type : 'depth',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })


					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject('Shape', 'shape', moduleData.shortName + '_shape', moduleData.w_params.indexChecked)

					],
					rangeDisplayMode : 'knob'
		    }],
				hiddenParameters: [],
			});
			if (moduleData.actsAsModulatorInAudibleRange != undefined
				&& moduleData.actsAsModulatorInAudibleRange) {
					module.hiddenParameters.push({ type : 'actsAsModulatorInAudibleRange', value: moduleData.actsAsModulatorInAudibleRange });
					//moduleData.shortName + '_actsAsModulatorInAudibleRange'
				}
			return module;
		};

        return LfoModuleFactory;
    }
);