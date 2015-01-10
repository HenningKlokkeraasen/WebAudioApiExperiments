
/*


	Factory for FM oscillator (frequency modulation) modules


*/

FmoModuleFactory.prototype = new OscillatorModuleFactory();
FmoModuleFactory.prototype.constructor = FmoModuleFactory;

function FmoModuleFactory() {
	this.moduleCssClass = 'fmomodule';
    this.renderSectionsVertically = true;

}
FmoModuleFactory.prototype.getModuleDefinition = function() {
	return {
		handlebarsTemplateSelector : this.handlebarsTemplateSelector,
		facade : FmOscFacade,
		parameters : [
			{ func : FmOscFacade.prototype.setFrequency, 		selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
			{ func : OscillatorFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},
			{ func : OscillatorFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	},
			{ func : FmOscFacade.prototype.setModFrequency, 	selector : 'input[data-parameterType="modFreq"]', 		ev : 'input'	},
			{ func : FmOscFacade.prototype.setModWaveType, 		selector : 'input[data-parameterType="modWaveType"]', 	ev : 'change'	},
			{ func : FmOscFacade.prototype.setModGain,			selector : 'input[data-parameterType="modGain"]',		ev : 'input'	}
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
FmoModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ { sectionName : 'Modulator (LFO)',
			ranges : [
				this.getModFreqParamObject(moduleData.shortName),
				this.getModGainParamObject(moduleData.shortName)
			],
			radioButtonLists : [
				this.getModWaveTypeSelectObject(moduleData.shortName, 0)
			] }, { sectionName : 'Carrier', 
			ranges : [
				this.getFrequencyParamObject(moduleData), 
				this.getDetuneParamObject(moduleData.shortName)
			], 
			radioButtonLists : [
				this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked),
			]
    }]});
};
FmoModuleFactory.prototype.getModFreqParamObject = function(shortName) {
	return	{ label : 'R',	type : 'modFreq',		min : 0,		max : 2000,		value : 6,		step : 0.1,	name : shortName + '_modfreq'	};
};
FmoModuleFactory.prototype.getModGainParamObject = function(shortName) {
	return  { label : 'D',	type : 'modGain',		min : 0,		max : 250,		value : 20,		step : 1,	name : shortName + '_modGain'	};
};
FmoModuleFactory.prototype.getModWaveTypeSelectObject = function(shortName, indexChecked) {
	return this.getWaveTypeSelectObject('M', 'modWaveType', shortName + '_modWave', indexChecked);
};
