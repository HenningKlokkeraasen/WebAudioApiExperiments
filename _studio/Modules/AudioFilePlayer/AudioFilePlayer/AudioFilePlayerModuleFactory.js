define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerFacade.js'
    ], function(ModuleFactoryBase, AudioFilePlayerFacade) {
        AudioFilePlayerModuleFactory.prototype = new ModuleFactoryBase();
        AudioFilePlayerModuleFactory.prototype.constructor = AudioFilePlayerModuleFactory;

        function AudioFilePlayerModuleFactory() {
            this.moduleCssClass = 'module-3u audioBuffer';
            this.hasAudioIn = false;
            
        }
        AudioFilePlayerModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : AudioFilePlayerFacade,
                parameters : [
                    { func: AudioFilePlayerFacade.prototype.setLoop,    selector: 'input[data-parameterType="loop"]',        ev: 'change'    }





                ]
            };
        };

        AudioFilePlayerModuleFactory.prototype.getModule = function(moduleData) {
            var module =  this.getModuleBase({
                name : moduleData.name,
				shortName : moduleData.shortName,
                sections : [ {
                    buttons: this.getKeyValuePairsForButton(moduleData.audioFilePaths),
                    checkBoxes : [ { label : 'Loop',  type : 'loop' } ]
            }]});
            module.audioFilePaths = moduleData.audioFilePaths;
            return module;
        };

        AudioFilePlayerModuleFactory.prototype.getKeyValuePairsForButton = function(audioFilePaths) {
            var buttons = [];
            audioFilePaths.forEach(function(filePath) {
                var s = filePath.split('/');
                var n = s[s.length - 1];
                
                var t = n.split('.');
                var name = t[0];

                // console.debug(filePath);
                buttons.push( { buttonId : filePath, buttonName : name } );
            });
            return buttons;
        };

        return AudioFilePlayerModuleFactory;
    }
);