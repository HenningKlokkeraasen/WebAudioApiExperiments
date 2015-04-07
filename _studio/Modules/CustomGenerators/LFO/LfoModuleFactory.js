define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomGenerators/LFO/LfoFacade.js'
    ], function(OscillatorModuleFactory, LfoFacade) {
		LfoModuleFactory.prototype = new OscillatorModuleFactory();
		LfoModuleFactory.prototype.constructor = LfoModuleFactory;

		function LfoModuleFactory() {
			this.moduleCssClass = 'oscillator';
			this.hasNoInputs = true;
			this.hasStartButton = true;
		}
		LfoModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : LfoFacade,
				parameters : [
					{ func : LfoFacade.prototype.setRate, 			selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
					{ func : LfoFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},
					{ func : LfoFacade.prototype.setType, 			selector : 'input[data-parameterType="waveType"]',		ev : 'change'	}



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
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)


					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					],
					rangeDisplayMode : 'knob'
		    }]});
		};

        return LfoModuleFactory;
    }
);