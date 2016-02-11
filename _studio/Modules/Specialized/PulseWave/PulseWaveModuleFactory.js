/*
	Factory for oscillator modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/PulseWave/PulseWaveFacade.js',
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
					{ func : PulseWaveFacade.prototype.setFrequency, 	selector : 'webaudio-knob[data-parameterType="frequency"]',		ev : 'change'	},
					{ func : PulseWaveFacade.prototype.setDetune, 		selector : 'webaudio-knob[data-parameterType="detune"]',		ev : 'change'	},
					{ func : PulseWaveFacade.prototype.setPulseWidth, 	selector : 'webaudio-knob[data-parameterType="pulseWidth"]',		ev : 'change'	},
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
				shortName : moduleData.shortName,
		        sections : [ {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName),
						{ label : 'Pulse width',	type : 'pulseWidth',		min : 0,		max : 100,		value: 50,		step : 1,		name : moduleData.shortName + 'pw'	}

					],
					rangeDisplayMode : 'webaudio-controls-color_knob'
					// radioButtonLists : [
					// 	this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					// ]
		    		
		    }]});
		};

		return PulseWaveModuleFactory;
	}
);
