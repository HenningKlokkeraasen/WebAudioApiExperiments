/*
	Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencerFacade.js'
    ], function(ModuleFactoryBase, StepSequencerFacade) {
		StepSequencerModuleFactory.prototype = new ModuleFactoryBase();
		StepSequencerModuleFactory.prototype.constructor = StepSequencerModuleFactory;

		function StepSequencerModuleFactory() {
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasFrequencyOut = true;
			this.moduleCssClass = 'module-8hp';
			this.headerCssClass = 'stepsequencer';
		}

		StepSequencerModuleFactory.prototype.getModuleDefinition = function() {
			var def = {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : StepSequencerFacade,
				parameters : [
					{ func : StepSequencerFacade.prototype.setTempoInBpm, selector : 'webaudio-knob[data-parameterType="tempoInBpm"]',		ev : 'change'	},
					{ func : StepSequencerFacade.prototype.setMasterFrequency, selector : 'webaudio-knob[data-parameterType="masterFrequency"]',		ev : 'change'	},
					{ func: StepSequencerFacade.prototype.toggleStartStop, selector: 'button[data-parameterType="togglestartstop"]', 
						ev: 'click', doNotInitOnRender: true, textWhenOff: 'Start', textWhenOn: 'Stop'}
				]
			};

			for (var i = 0; i < 16; i++) {
				def.parameters.push(
					{func : StepSequencerFacade.prototype.setOnOff, selector : `webaudio-switch[data-parameterType="step_toggles_${i}"]`,		ev : 'change', additionalParameters: {'stepNumber': i}	}) 
				def.parameters.push(
					{func : StepSequencerFacade.prototype.setStepFrequency, selector : `webaudio-knob[data-parameterType="step_frequencies_${i}"]`,		ev : 'change', additionalParameters: {'stepNumber': i}	})
				def.parameters.push(
					{func : StepSequencerFacade.prototype.setStepLength, selector : `webaudio-knob[data-parameterType="step_lengths_${i}"]`,		ev : 'change', additionalParameters: {'stepNumber': i}	})
			}
			return def;
		};

		StepSequencerModuleFactory.prototype.getModule = function(moduleData) {
			var stepsToggles = [];
			var stepsNoteLengths = [];
			var stepsFrequencies = [];
			for (var i = 0; i < 16; i++) {
				stepsToggles.push(
					{ buttonName : i+1,	type : 'step_toggles_'+i,	buttonId : moduleData.shortName + '_step_toggles'+i });
				stepsFrequencies.push(
					{ label : i+1,	type : 'step_frequencies_'+i,	min :-100, max : 100, value: 0, step : 0.1, name : moduleData.shortName + '_step_frequency' + i	});
				stepsNoteLengths.push(
					{ label : i+1,	type : 'step_lengths_'+i,	min :0.1, max : 1, value: 0.2, step : 0.1, name : moduleData.shortName + '_step_notelength' + i	});
			}

			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
		    		sectionName: 'Master',
		    		buttons: [
		    			{
		    				buttonId: moduleData.shortName + '_start', buttonName: 'Start', 
		    				buttonLabel: 'Start / Stop', buttonCssClass: 'round', type: 'togglestartstop'
		    			}],
					ranges : [ 
						{ label : 'Tempo (BPM)',	type : 'tempoInBpm',	min : moduleData.tempoInBpm.min, max : moduleData.tempoInBpm.max, value: moduleData.tempoInBpm.val, step : moduleData.tempoInBpm.stp, name : moduleData.shortName + '_tempoInBpm'	},
						{ label: 'Freuquency', type: 'masterFrequency', min: 20, max: 3000, value: 440, step: 1, name: moduleData.shortName + '_masterFrequency'}],
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }, {
		    	sectionName: 'On / Off',
		    	buttons : stepsToggles,
					buttonDisplayMode : 'webaudio-controls-switchtoggle'
		    }, {
		    	sectionName: 'Note length',
		    	ranges : stepsNoteLengths,
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }, {
		    	sectionName: 'Frequency',
		    	ranges : stepsFrequencies,
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }]});
		};

        return StepSequencerModuleFactory;
    }
);
