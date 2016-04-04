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
			this.hasStartButton = true;
			this.buttonCssClass = 'round';
		}

		StepSequencerModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : StepSequencerFacade,
				parameters : [
					{ func : StepSequencerFacade.prototype.setTempoInBpm, selector : 'webaudio-knob[data-parameterType="tempoInBpm"]',		ev : 'change'	},
				]
			};
		};

		StepSequencerModuleFactory.prototype.getModule = function(moduleData) {
			var ranges = [];
			ranges.push(
				{ label : 'Tempo (BPM)',	type : 'tempoInBpm',	min : moduleData.tempoInBpm.min, max : moduleData.tempoInBpm.max, value: moduleData.tempoInBpm.val, step : moduleData.tempoInBpm.stp, name : moduleData.shortName + '_tempoInBpm'	}
			);
			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					ranges : ranges,
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }]});
		};

        return StepSequencerModuleFactory;
    }
);
