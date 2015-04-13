define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomModulators/LFO/LfoFacade.js'
    ], function(OscillatorModuleFactory, LfoFacade) {
		LfoModuleFactory.prototype = new OscillatorModuleFactory();
		LfoModuleFactory.prototype.constructor = LfoModuleFactory;

		function LfoModuleFactory() {
			this.hasTriggerIn = false;
			this.hasAudioOut = false;
		}
		LfoModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : LfoFacade,
				parameters : [
					{ func : LfoFacade.prototype.setRate, 			selector : 'input[data-parameterType="rate"]',			ev : 'input'	},
					{ func : LfoFacade.prototype.setDepth, 			selector : 'input[data-parameterType="depth"]',			ev : 'input'	},
					{ func : LfoFacade.prototype.setShape, 			selector : 'input[data-parameterType="shape"]',			ev : 'change'	}



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
		LfoModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						this.getRangeControlData({ label : 'R',     type : 'rate',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' }),
						this.getRangeControlData({ label : 'D',     type : 'depth',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })


					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject('S', 'shape', moduleData.shortName + '_shape', moduleData.w_params.indexChecked)

					],
					rangeDisplayMode : 'knob'
		    }]});
		};

        return LfoModuleFactory;
    }
);