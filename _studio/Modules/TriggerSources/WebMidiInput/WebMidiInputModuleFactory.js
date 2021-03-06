/*
    Module Factory for Web MIDI API modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInputFacade.js'
    ], function(ModuleFactoryBase, WebMidiInputFacade) {
        WebMidiInputModuleFactory.prototype = new ModuleFactoryBase();
        WebMidiInputModuleFactory.prototype.constructor = WebMidiInputModuleFactory;

        function WebMidiInputModuleFactory() {
			this.headerCssClass = 'externalInputModule';
			// this.moduleCssClass = 'coolstripes';
			this.moduleCssClass = 'module-1hp';
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasFrequencyOut = true;
            this.hasKeyboardInterface = true;   // not true per se, but hack to get the output of note
        }
		
        WebMidiInputModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : WebMidiInputFacade,
                parameters : [
					{ func : WebMidiInputFacade.prototype.setGlideTime, 	selector : 'webaudio-knob[data-parameterType="glideTime"]',		ev : 'change'	},
					{ func : WebMidiInputFacade.prototype.setDebugMode, 	selector : 'input[data-parameterType="debugMode"]',		ev : 'change'	},
                ]
            };
        };

        WebMidiInputModuleFactory.prototype.getModule = function(moduleData) {
			var debugMode = false;
			if (moduleData.debugMode != undefined && moduleData.debugMode) {
				// this.moduleCssClass = 'module'
				debugMode = true;
			}
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
					ranges : [
						{ label : 'Glide (Portamento)',	type : 'glideTime',		min : 0,		max : 0.5,		value: 0,		step : 0.01,		name : moduleData.shortName + '_glide'	}
					],
					rangeDisplayMode : 'webaudio-controls-color_knob'
				}],
					hiddenParameters: [
						{ type: 'debugMode', value: debugMode, name: moduleData.shortName + '_debugMode' }
					]
				});
        };

        return WebMidiInputModuleFactory;
    }
);