/*
	Factory for super saw modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/SuperSaw/SuperSawFacade.js',
	], function(OscillatorModuleFactory, SuperSawFacade) {
		SuperSawModuleFactory.prototype = new OscillatorModuleFactory();
		SuperSawModuleFactory.prototype.constructor = SuperSawModuleFactory;

		function SuperSawModuleFactory() {



		}
		SuperSawModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : SuperSawFacade,
				parameters : [
					{ func : SuperSawFacade.prototype.setFrequency, 	selector : 'webaudio-knob[data-parameterType="frequency"]',		ev : 'change'	},
					{ func : SuperSawFacade.prototype.setDetune, 		selector : 'webaudio-knob[data-parameterType="detune"]',		ev : 'change'	},

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
				shortName : moduleData.shortName,
		        sections : [ {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName),
						

					],
					rangeDisplayMode : 'webaudio-controls-color_knob'
					// radioButtonLists : [
					// 	this.getWaveTypeSelec	tObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					// ]
		    }]});
		};

		return SuperSawModuleFactory;
	}
);