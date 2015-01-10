
/*


	Factory for VCO modules
	

*/

VoiceModuleFactory.prototype = new OscillatorModuleFactory();
VoiceModuleFactory.prototype.constructor = VoiceModuleFactory;

function VoiceModuleFactory() {
	this.moduleCssClass = 'voicemodule';
	this.renderSectionsVertically = true;
	this.hasStartButton = false;
}
VoiceModuleFactory.prototype.getModuleDefinition = function() {
	return {
		handlebarsTemplateSelector : this.handlebarsTemplateSelector,
		facade : VoiceFacade,
		parameters : [
			{ func : VoiceFacade.prototype.setHasFilter,		selector : 'input[data-parameterType="hasFilter"]',		ev : 'change'	},
			{ func : VoiceFacade.prototype.setHasModulator,		selector : 'input[data-parameterType="hasModulator"]',	ev : 'change'	},

			// LFO (modulator)
			{ func : VoiceFacade.prototype.setModType,			selector : 'input[data-parameterType="modWaveType"]',		ev : 'change'	},
			{ func : VoiceFacade.prototype.setModFreq,			selector : 'input[data-parameterType="modFreq"]',		ev : 'change'	},
			{ func : VoiceFacade.prototype.setModGain,			selector : 'input[data-parameterType="modGain"]',		ev : 'change'	},

			// DCO
			{ func : VoiceFacade.prototype.setType,				selector : 'input[data-parameterType="waveType"]',		ev : 'change'	},

			// VCF todo

			// VCF EG todo

			// DCA todo

			// DCA EG
			{ func : VoiceFacade.prototype.setAttackTime,		selector : 'input[data-parameterType="amp_attackTime"]',	ev : 'input'	},
			{ func : VoiceFacade.prototype.setDecayTime,		selector : 'input[data-parameterType="amp_decayTime"]',		ev : 'input'	},
			{ func : VoiceFacade.prototype.setSustainLevel,		selector : 'input[data-parameterType="amp_sustainLevel"]',	ev : 'input'	},
			{ func : VoiceFacade.prototype.setReleaseTime,		selector : 'input[data-parameterType="amp_releaseTime"]',	ev : 'input'	}
		]
	};
};
// moduleData
// 		name
// 		shortName
//		moduleSettings
//			hasModulator
//			hasFilter
//
//
// 		w_params
//			indexChecked
VoiceModuleFactory.prototype.getModule = function(moduleData) {
	var sections = [];

	var hiddenParameters = [];

	if (moduleData.moduleSettings && moduleData.moduleSettings.hasModulator) {
		sections.push(this.getLfoSection(moduleData));
		hiddenParameters.push({ type : 'hasModulator', value : 'true' });
	}

	sections.push(this.getDcoSection(moduleData));

	if (moduleData.moduleSettings && moduleData.moduleSettings.hasFilter) {
		sections.push(this.getDcfSection(moduleData));
		hiddenParameters.push({ type : 'hasFilter', value : 'true' });
	}

	sections.push(this.getDcaSection(moduleData));

    return this.getModuleBase({
        name : moduleData.name, 
        sections : sections,
        hiddenParameters : hiddenParameters
	});
};

VoiceModuleFactory.prototype.getDcoSection = function(moduleData) {
	return { sectionName : 'DCO',
		ranges : [
			this.getDetuneParamObject(moduleData.shortName)
		], 
		radioButtonLists : [
			this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)
		] 
	};
};

VoiceModuleFactory.prototype.getDcfSection = function(moduleData) {
	return { sectionName : 'DCF EG', 
		rangeDisplayMode : 'slider-vertical',
		ranges : this.getEnvelopeControls(moduleData.shortName, 'filter')
	};
};

VoiceModuleFactory.prototype.getDcaSection = function(moduleData) {
	return { sectionName : 'DCA EG', 
		rangeDisplayMode : 'slider-vertical',
		ranges : this.getEnvelopeControls(moduleData.shortName, 'amp')
	};
};

VoiceModuleFactory.prototype.getLfoSection = function(moduleData) {
	return { sectionName : 'Modulator (LFO)',
		ranges : [
    		FmoModuleFactory.prototype.getModFreqParamObject(moduleData.shortName),
    		FmoModuleFactory.prototype.getModGainParamObject(moduleData.shortName)
    	],
		radioButtonLists : [
			FmoModuleFactory.prototype.getModWaveTypeSelectObject(moduleData.shortName, 0)
		]
	};
}

VoiceModuleFactory.prototype.getEnvelopeControls = function(namePrefix, type) {
	return [
		{ label : 'A',	type : type + '_attackTime',	min : 0,	max : 2,	value: 0.1,		step : 0.1,		name : namePrefix + '_' + type + '_attack'  },
		{ label : 'D',	type : type + '_decayTime',		min : 0,	max : 2,	value: 0.2,		step : 0.1,		name : namePrefix + '_' + type + '_decay'	},
		{ label : 'S',	type : type + '_sustainLevel',	min : 0,	max : 1,	value: 0.6,		step : 0.1,		name : namePrefix + '_' + type + '_sustain'	},
		{ label : 'R',	type : type + '_releaseTime',	min : 0,	max : 2,	value: 0.1,		step : 0.1,		name : namePrefix + '_' + type + '_release'	},
	];
};
