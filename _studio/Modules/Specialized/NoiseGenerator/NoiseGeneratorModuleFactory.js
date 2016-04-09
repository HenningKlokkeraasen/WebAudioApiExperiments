/*
	Factory for Noise Generator modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGeneratorFacade.js',
	], function(OscillatorModuleFactory, NoiseGeneratorFacade) {
		NoiseGeneratorModuleFactory.prototype = new OscillatorModuleFactory();
		NoiseGeneratorModuleFactory.prototype.constructor = NoiseGeneratorModuleFactory;

		function NoiseGeneratorModuleFactory() {
			
            this.hasTriggerIn = true;
			
		}
		NoiseGeneratorModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : NoiseGeneratorFacade,
				parameters : [
					{ func : NoiseGeneratorFacade.prototype.setNoiseType, 		selector : 'select[data-parameterType="noiseType"]',		ev : 'change'	},
					this.getStartStopButtonParameter(NoiseGeneratorFacade.prototype.toggleStartStop)
				]
			};
		};
		// moduleData
		// 		name
		// 		shortName







		NoiseGeneratorModuleFactory.prototype.getModule = function(moduleData) {
		    return this.getModuleBase({
		        name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					buttons: [
						this.getStartStopButtonControl(moduleData.shortName)
					],
				}, {
			    	selectLists : [
						{ 
							label : 'Noise type',
							type : 'noiseType',
							options : NoiseGeneratorFacade.prototype.noiseTypes
						},
			    	],
		    }]});
		};

		return NoiseGeneratorModuleFactory;
	}
);
