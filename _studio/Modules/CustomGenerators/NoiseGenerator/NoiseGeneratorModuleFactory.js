/*
	Factory for Noise Generator modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomGenerators/NoiseGenerator/NoiseGeneratorFacade.js',
	], function(OscillatorModuleFactory, NoiseGeneratorFacade) {
		NoiseGeneratorModuleFactory.prototype = new OscillatorModuleFactory();
		NoiseGeneratorModuleFactory.prototype.constructor = NoiseGeneratorModuleFactory;

		function NoiseGeneratorModuleFactory() {
			
			
			
		}
		NoiseGeneratorModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : NoiseGeneratorFacade,
				parameters : [
					{ func : NoiseGeneratorFacade.prototype.setNoiseType, 		selector : 'select[data-parameterType="noiseType"]',		ev : 'change'	},





				]
			};
		};
		// moduleData
		// 		name
		// 		shortName







		NoiseGeneratorModuleFactory.prototype.getModule = function(moduleData) {
		    return this.getModuleBase({
		        name : moduleData.name, 
		        sections : [ {
			    	selectLists : [
						{ 
							label : 'N',
							type : 'noiseType',
							options : NoiseGeneratorFacade.prototype.noiseTypes
						},
			    	],
		    }]});
		};

		return NoiseGeneratorModuleFactory;
	}
);
