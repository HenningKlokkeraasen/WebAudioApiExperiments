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
				]
			};
		};

		StepSequencerModuleFactory.prototype.getModule = function(moduleData) {
			var ranges = [];
			
			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
		    }]});
		};

        return StepSequencerModuleFactory;
    }
);
