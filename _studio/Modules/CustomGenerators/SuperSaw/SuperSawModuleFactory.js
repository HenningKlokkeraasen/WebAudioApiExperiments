/*
	Factory for super saw modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomGenerators/SuperSaw/SuperSawFacade.js',
	], function(OscillatorModuleFactory, SuperSawFacade) {
		SuperSawModuleFactory.prototype = new OscillatorModuleFactory();
		SuperSawModuleFactory.prototype.constructor = SuperSawModuleFactory;

		function SuperSawModuleFactory() {
			this.moduleCssClass = '';
			this.hasNoInputs = true;
			this.hasStartButton = true;
		}
		SuperSawModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : SuperSawFacade,
				parameters : [
					{ func : SuperSawFacade.prototype.setFrequency, 	selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
					{ func : SuperSawFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},

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
		SuperSawModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName),
						

					]
					// radioButtonLists : [
					// 	this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					// ]
		    }]});
		};

		return SuperSawModuleFactory;
	}
);