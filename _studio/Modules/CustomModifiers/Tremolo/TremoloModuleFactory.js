
/*


	Factory for Tremolo modules


*/

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

			{ func : TremoloFacade.prototype.setLfoRate,		selector : 'input[data-parameterType="lfo_rate"]',		ev : 'input'	},
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
        sections : [ { sectionName : 'LFO',
			ranges : [
				{ label : 'R', 	type : 'lfo_rate', 	min : 0.1, 	max : 20,		value: 10,	 	step : 0.01,		name : moduleData.shortName + '_R'	}
				


			], 
			radioButtonLists : [
				this.getWaveTypeSelectObject('W', 'waveType', moduleData.shortName + 'wave', moduleData.w_params.indexChecked)

			]
    }]});
};
