
/*


	Factory for FM VCO modules
	

*/

FmVoiceModuleFactory.prototype = new VoiceModuleFactory();
FmVoiceModuleFactory.prototype.constructor = FmVoiceModuleFactory;

function FmVoiceModuleFactory() {
	this.headerCssClass = 'fmvoicemodule';

	this.hasStartButton = false;
}
FmVoiceModuleFactory.prototype.getModuleDefinition = function() {
	var base = VoiceModuleFactory.prototype.getModuleDefinition.call(this);

	base.facade = FmVoiceFacade;
	base.parameters.push(
			{ func : FmVoiceFacade.prototype.setModType,		selector : 'input[data-parameterType="modType"]',		ev : 'change'	},
			{ func : FmVoiceFacade.prototype.setModFreq,		selector : 'input[data-parameterType="modFreq"]',		ev : 'change'	},
			{ func : FmVoiceFacade.prototype.setModGain,		selector : 'input[data-parameterType="modGain"]',		ev : 'change'	}


		);

	return base;
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
FmVoiceModuleFactory.prototype.getModule = function(moduleData) {
	var base = VoiceModuleFactory.prototype.getModule.call(this, moduleData);
	base.sections.push({
			sectionName : 'Modulator (LFO)',
			ranges : [
	    		FmoModuleFactory.prototype.getModFreqParamObject(moduleData.shortName),
	    		FmoModuleFactory.prototype.getModGainParamObject(moduleData.shortName)
	    	],
			radioButtonLists : [
				FmoModuleFactory.prototype.getModWaveTypeSelectObject(moduleData.shortName, 0)
			]

	});
	return base;
};
