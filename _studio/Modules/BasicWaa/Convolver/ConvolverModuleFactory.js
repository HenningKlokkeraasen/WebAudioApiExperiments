define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Convolver/ConvolverFacade.js'
    ], function(ModuleFactoryBase, ConvolverFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        ConvolverModuleFactory.prototype = new ModuleFactoryBase();
        ConvolverModuleFactory.prototype.constructor = ConvolverModuleFactory;

        function ConvolverModuleFactory() {
            this.moduleCssClass = 'convolver';
            
            
        }
        ConvolverModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : ConvolverFacade,
                parameters : [
        			{ func: ConvolverFacade.prototype.setImpulse,		selector: 'select[data-parametertype="impulse"]',		ev: 'change'	}





                ]
            };
        };
        // moduleData
        //      name
        //      shortName
        //		impulseOptions
        //
        //
        //
        //
        //
        //
        ConvolverModuleFactory.prototype.getModule = function(moduleData) {
            var module =  this.getModuleBase({
                name : moduleData.name, 
                sections : [ {
                    ranges : [
                        { label : 'F',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  }, 
                        { label : 'Q',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  }, 
                        { label : 'G',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  }

                    ],
                    
                    selectLists : [
                        { label : 'I',	type : 'impulse', 		options: this.getKeyValuePairsForSelectListOptions(moduleData.impulseFilePaths) }
                    ]
            }]});
            module.impulseFilePaths = moduleData.impulseFilePaths;
            return module;
        };

        ConvolverModuleFactory.prototype.getKeyValuePairsForSelectListOptions = function(impulseFilePaths) {
            var impulseOptions = [];
            impulseFilePaths.forEach(function(filePath) {
                var s = filePath.split('/');
                var name = s[s.length - 1];
                console.debug(filePath);
                impulseOptions.push( { value : filePath, name : name } );
            });
            return impulseOptions;
        };

        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return ConvolverModuleFactory;
    }
);