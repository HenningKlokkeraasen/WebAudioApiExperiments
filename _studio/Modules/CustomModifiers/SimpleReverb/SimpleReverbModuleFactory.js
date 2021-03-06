/*
	Factory for simple reverb modules
*/
define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverbFacade.js'
    ], function(ModuleFactoryBase, SimpleReverbFacade) {
        SimpleReverbModuleFactory.prototype = new ModuleFactoryBase();
        SimpleReverbModuleFactory.prototype.constructor = SimpleReverbModuleFactory;

        function SimpleReverbModuleFactory() {
            this.headerCssClass = 'convolver';
            
            
        }
        SimpleReverbModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : SimpleReverbFacade,
                parameters : [
                    // reverb build impulse is expensive. // bind to change instead of input
                    { func: SimpleReverbFacade.prototype.setSeconds,    selector: 'webaudio-knob[data-parameterType="seconds"]',        ev: 'change'    },
                    { func: SimpleReverbFacade.prototype.seDecay,       selector: 'webaudio-knob[data-parameterType="decay"]',          ev: 'change'    },
                    { func: SimpleReverbFacade.prototype.setReverse,    selector: 'input[data-parameterType="reverse"]',        ev: 'change'    }


                ]
            };
        };
        // moduleData
        //      name
        //      shortName
        // 
        // 
        // 
        // 
        // 
        // 
        //  
        SimpleReverbModuleFactory.prototype.getModule = function(moduleData) {
            return this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                        { label : 'Seconds',  type : 'seconds',   min : 0.1,    max : 5,      value: 1,       step : 0.1,       name : moduleData.shortName + '_s'      }, 
                        { label : 'Decay',  type : 'decay',     min : 0.1,    max : 5,      value: 1,       step : 0.1,       name : moduleData.shortName + '_d'      }

                    ],
                    rangeDisplayMode : 'webaudio-controls-color_knob'
            		}, {
                    checkBoxes : [
                        { label : 'Reverse',  type : 'reverse' }
                    ]
            }]});
        };

        return SimpleReverbModuleFactory;
    }
);