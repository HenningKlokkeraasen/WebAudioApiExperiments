/*
	Factory for Harmonic Generator modules
*/
define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/HarmonicGenerator/HarmonicGeneratorFacade.js',
	], function(OscillatorModuleFactory, HarmonicGeneratorFacade) {
		HarmonicGeneratorModuleFactory.prototype = new OscillatorModuleFactory();
		HarmonicGeneratorModuleFactory.prototype.constructor = HarmonicGeneratorModuleFactory;

		function HarmonicGeneratorModuleFactory() {
			this.headerCssClass = 'harmonicGenerator';
			this.hasTriggerIn = false;
			this.hasModulateIn = false;
			this.hasModulateOut = false;
		}
		HarmonicGeneratorModuleFactory.prototype.getModuleDefinition = function() {
			var base = OscillatorModuleFactory.prototype.getModuleDefinition.call(this);
			base.facade = HarmonicGeneratorFacade;
			base.parameters[0].func = HarmonicGeneratorFacade.prototype.setFrequency;
			base.parameters[1].func = HarmonicGeneratorFacade.prototype.setDetune;
			base.parameters[2].func = HarmonicGeneratorFacade.prototype.setType;
			base.parameters[3].func = HarmonicGeneratorFacade.prototype.toggleStartStop;
			base.parameters.push(
					{ func : HarmonicGeneratorFacade.prototype.setNumberOfHarmonics, 	selector : 'input[data-parameterType="numberOfHarmonics"]',			ev : 'input'    },
					{ func : HarmonicGeneratorFacade.prototype.setAmplitudeMode, 		selector : 'input[data-parameterType="AmplitudeMode"]',		ev : 'change'	},
					{ func : HarmonicGeneratorFacade.prototype.setFrequencyMode, 		selector : 'input[data-parameterType="FrequencyMode"]',		ev : 'change'	},
					{ func : HarmonicGeneratorFacade.prototype.setStackMode, 			selector : 'input[data-parameterType="StackMode"]',		ev : 'change'	} ,
					{ func : HarmonicGeneratorFacade.prototype.setPhaseInvertOnAll,		selector: 'input[data-parameterType="phaseInvertOnAll"]',		ev: 'change'	},
					{ func : HarmonicGeneratorFacade.prototype.setPhaseInvertOnEveryFourth,selector: 'input[data-parameterType="phaseInvertOnEveryFourth"]',		ev: 'change'	}
				);

			return base;
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
		HarmonicGeneratorModuleFactory.prototype.getModule = function(moduleData) {
			var base = OscillatorModuleFactory.prototype.getModule.call(this, moduleData);
			base.sections.push({
					sectionName : '',
					ranges : [
		                this.getRangeControlData({ 
		                	label : 'Number of harmonics',
		                	type : 'numberOfHarmonics',	
		                	params : { min : 0, 	max : HarmonicGeneratorFacade.prototype.numberOfHarmonics, val :  0, stp :  1 	},
		                	name : moduleData.shortName + '_numberOfHarmonics' })
			    	],
					radioButtonLists : [
						{ 
							label : 'Frequency mode',
							type : 'FrequencyMode',
							rdoName : moduleData.shortName + '_FrequencyMode',
							radioButtons : HarmonicGeneratorFacade.prototype.frequencyModes
						},
						{ 
							label : 'Stack mode',
							type : 'StackMode',
							rdoName : moduleData.shortName + '_StackMode',
							radioButtons : HarmonicGeneratorFacade.prototype.stackModes
						},
						{
							label : 'Amplitude mode',
							type : 'AmplitudeMode',
							rdoName : moduleData.shortName + '_AmplitudeMode',
							radioButtons : HarmonicGeneratorFacade.prototype.amplitudeModes
						}
					],
		    		checkBoxes : [
		    			{ label : 'Phase invert on all',	type : 'phaseInvertOnAll' },
		    			{ label : 'Phase invert on every fourth',	type : 'phaseInvertOnEveryFourth' }
		    		]

			});
			return base;
		};

		return HarmonicGeneratorModuleFactory;
	}
);
