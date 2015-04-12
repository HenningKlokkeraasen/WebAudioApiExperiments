/*
	Factory for oscillator modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomGenerators/PulseWave/PulseWaveFacade.js',
	], function(OscillatorModuleFactory, PulseWaveFacade) {
		PulseWaveModuleFactory.prototype = new OscillatorModuleFactory();
		PulseWaveModuleFactory.prototype.constructor = PulseWaveModuleFactory;

		function PulseWaveModuleFactory() {



		}
		PulseWaveModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : PulseWaveFacade,
				parameters : [
					{ func : PulseWaveFacade.prototype.setFrequency, 	selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
					{ func : PulseWaveFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},
					{ func : PulseWaveFacade.prototype.setPulseWidth, 	selector : 'input[data-parameterType="pulseWidth"]',		ev : 'input'	},
					// { func : OscillatorFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	}



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
		PulseWaveModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)

					],
					rangeDisplayMode : 'knob'
					// radioButtonLists : [
					// 	this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					// ]
		    		}, {
					ranges : [
						{ label : 'P',	type : 'pulseWidth',		min : 0,		max : 100,		value: 50,		step : 1,		name : moduleData.shortName + 'pw'	}

					],
					rangeDisplayMode : 'slider-vertical'
		    }]});
		};

		return PulseWaveModuleFactory;
	}
);
