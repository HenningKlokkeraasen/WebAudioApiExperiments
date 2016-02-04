/*
    Module Factory for envelope generator modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancockFacade.js'
    ], function(ModuleFactoryBase, QwertyHancockFacade) {

        QwertyHancockModuleFactory.prototype = new ModuleFactoryBase();
        QwertyHancockModuleFactory.prototype.constructor = QwertyHancockModuleFactory;

        function QwertyHancockModuleFactory() {
            this.moduleCssClass = 'module-3u';
			this.headerCssClass = 'externalInputModule';
            this.hasAudioIn = false;
            this.hasAudioOut = false;
            this.hasTriggerOut = true;
            this.hasControlOut = true;
            this.hasKeyboardInterface = true;
        }
        QwertyHancockModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : QwertyHancockFacade,
                parameters : [
                    { func: QwertyHancockFacade.prototype.setOctave, selector: 'input[data-parameterType="octave"]',      ev: 'input'     },
                	{ func : QwertyHancockFacade.prototype.setGlideTime, 	selector : 'input[data-parameterType="glideTime"]',		ev : 'input'	},

                    


                ]
            };
        };

        








        QwertyHancockModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        { label : 'Octave',  type : 'octave',     min : 0,    max : 8,    value: 4,    step : 1,    name : moduleData.shortName + '_f'  },
                        { label : 'Glide/Portamento',	type : 'glideTime',		min : 0,		max : 0.5,		value: 0,		step : 0.01,		name : moduleData.shortName + '_glide'	}


                    ],
                    rangeDisplayMode : 'knob'




            }]});
        };

        return QwertyHancockModuleFactory;
    }
);