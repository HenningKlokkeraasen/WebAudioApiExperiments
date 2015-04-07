/*
	Factory for FM oscillator (frequency modulation) modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js',
	'/_studio/Modules/CustomGenerators/FmOsc/FmOscFacade.js',
	], function(OscillatorModuleFactory, OscillatorFacade, FmOscFacade) {
		FmOscModuleFactory.prototype = new OscillatorModuleFactory();
		FmOscModuleFactory.prototype.constructor = FmOscModuleFactory;

		function FmOscModuleFactory() {
			this.moduleCssClass = 'fmomodule';
		    this.renderSectionsVertically = true;

		}
		FmOscModuleFactory.prototype.getModuleDefinition = function() {
			return {
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : FmOscFacade,
				parameters : [
					{ func : FmOscFacade.prototype.setFrequency, 		selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
					{ func : OscillatorFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},
					{ func : OscillatorFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	},
					{ func : FmOscFacade.prototype.setModFrequency, 	selector : 'input[data-parameterType="rate"]', 			ev : 'input'	},
					{ func : FmOscFacade.prototype.setModWaveType, 		selector : 'input[data-parameterType="modWaveType"]', 	ev : 'change'	},
					{ func : FmOscFacade.prototype.setModGain,			selector : 'input[data-parameterType="depth"]',			ev : 'input'	}
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
		//		mod_freq_params
		//			min
		//			max
		//			val
		//			stp
		//		isModulatorLfo
		FmOscModuleFactory.prototype.getModule = function(moduleData) {
		    return this.getModuleBase({
		        name : moduleData.name, 
		        sections : [ { sectionName : moduleData.isModulatorLfo ? 'LFO' : 'Modulator',
					ranges : [
						this.getModFreqParamObject(moduleData.shortName, moduleData.mod_freq_params),
						this.getModGainParamObject(moduleData.shortName)
					],
					radioButtonLists : [
						this.getModWaveTypeSelectObject(moduleData.shortName, 0)
					],
					rangeDisplayMode : 'knob' 
					}, { sectionName : moduleData.isModulatorLfo ? 'Oscillator' : 'Carrier', 
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)
					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked),
					],
					rangeDisplayMode : 'knob'
		    }]});
		};
		FmOscModuleFactory.prototype.getModFreqParamObject = function(shortName, mod_freq_params) {
			return	{ label : 'R',	type : 'rate',	 min : mod_freq_params.min, max : mod_freq_params.max, value : mod_freq_params.val, step: mod_freq_params.stp,	name : shortName + '_rate'	};
		};
		FmOscModuleFactory.prototype.getModGainParamObject = function(shortName) {
			return  { label : 'D',	type : 'depth',		min : 0,		max : 250,		value : 20,		step : 1,	name : shortName + '_depth'	};
		};
		FmOscModuleFactory.prototype.getModWaveTypeSelectObject = function(shortName, indexChecked) {
			return this.getWaveTypeSelectObject('M', 'modWaveType', shortName + '_modWave', indexChecked);
		};

		return FmOscModuleFactory;
	}
);

