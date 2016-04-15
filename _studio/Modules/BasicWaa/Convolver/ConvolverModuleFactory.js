define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Convolver/ConvolverFacade.js'
    ], function(ModuleFactoryBase, ConvolverFacade) {
        
        ConvolverModuleFactory.prototype = new ModuleFactoryBase();
        ConvolverModuleFactory.prototype.constructor = ConvolverModuleFactory;

        function ConvolverModuleFactory() {
            this.headerCssClass = 'convolver';    
        }

        ConvolverModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : ConvolverFacade,
                parameters : [
        			{ func: ConvolverFacade.prototype.setImpulse,		selector: 'input[data-parametertype="impulse"]',		ev: 'change'	}
                ]
            };
        };

        ConvolverModuleFactory.prototype.getModule = function(moduleData) {
            var module =  this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    radioButtonLists: [
                        {label : 'Impulse file',    type : 'impulse', rdoName: moduleData.shortName + '_impulse', 
                            radioButtons: this.getKeyValuePairsForSelectListOptions(moduleData.audioFilePaths) }
                    ]
            }]});
            module.audioFilePaths = moduleData.audioFilePaths;
            return module;
        };

        ConvolverModuleFactory.prototype.getKeyValuePairsForSelectListOptions = function(audioFilePaths) {
            var impulseOptions = [];
            audioFilePaths.forEach(function(filePath) {
                var s = filePath.split('/');
                var name = s[s.length - 1];
                // console.debug(filePath);
                impulseOptions.push( { value : filePath, name : name, selected: audioFilePaths.indexOf(filePath) == 0 } );
            });
            return impulseOptions;
        };

        return ConvolverModuleFactory;
    }
);