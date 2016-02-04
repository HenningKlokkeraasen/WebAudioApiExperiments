/*
    Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputFacade.js'
    ], function(ModuleFactoryBase, WebMidiInputFacade) {

        WebMidiInputModuleFactory.prototype = new ModuleFactoryBase();
        WebMidiInputModuleFactory.prototype.constructor = WebMidiInputModuleFactory;

        function WebMidiInputModuleFactory() {
			this.headerCssClass = 'externalInputModule';
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasControlOut = true;
            this.hasKeyboardInterface = true;   // not true per se, but hack to get the output of note
        }
        WebMidiInputModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : WebMidiInputFacade,
                parameters : [
					{ func : WebMidiInputFacade.prototype.setGlideTime, 	selector : 'input[data-parameterType="glideTime"]',		ev : 'input'	},
                

                    


                ]
            };
        };

        








        WebMidiInputModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
					ranges : [
						{ label : 'Glide/Portamento',	type : 'glideTime',		min : 0,		max : 0.5,		value: 0,		step : 0.01,		name : moduleData.shortName + '_glide'	}
						


					], 
					
					
					
					
					rangeDisplayMode : 'knob'
				}]});
        };

        return WebMidiInputModuleFactory;
    }
);