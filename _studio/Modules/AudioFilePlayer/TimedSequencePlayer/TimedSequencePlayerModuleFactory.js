define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayerFacade.js'
    ], function(ModuleFactoryBase, TimedSequencePlayerFacade) {
        TimedSequencePlayerModuleFactory.prototype = new ModuleFactoryBase();
        TimedSequencePlayerModuleFactory.prototype.constructor = TimedSequencePlayerModuleFactory;

        function TimedSequencePlayerModuleFactory() {
            this.moduleCssClass = 'wideModule audioBuffer';
            this.hasNoInputs = true;
            
        }
        TimedSequencePlayerModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : TimedSequencePlayerFacade,
                parameters : [
                    





                ]
            };
        };

        TimedSequencePlayerModuleFactory.prototype.getModule = function(moduleData) {
            var module =  this.getModuleBase({
                name : moduleData.name, 
                sections : [ {
                    buttons: this.getKeyValuePairsForButton(moduleData.sequences)
            }]});
            module.audioFilePaths = this.getAudioFilePathsFromSequences(moduleData.sequences);
            module.sequences = moduleData.sequences;
            return module;
        };

        TimedSequencePlayerModuleFactory.prototype.getAudioFilePathsFromSequences = function(sequences) {
        	var audioFilePaths = [];
        	sequences.forEach(function(sequence) {
        		sequence.sequenceData.drumSequences.forEach(function(drumSequence) {
        			var bufferKey = drumSequence.bufferKey;
        			if (audioFilePaths.indexOf(bufferKey) < 0) {
        				audioFilePaths.push(bufferKey);
        				// console.debug(bufferKey + ' added to list');
        			} else {
        				// console.debug(bufferKey + ' already in list');
        			}
        		});
        	});
        	return audioFilePaths;
        };

        TimedSequencePlayerModuleFactory.prototype.getKeyValuePairsForButton = function(sequences) {
            var buttons = [];
            sequences.forEach(function(sequence) {
                // console.debug('adding button for ' + sequence.sequenceName);
                buttons.push( { buttonId : sequence.sequenceName, buttonName : sequence.sequenceName } );
            });
            return buttons;
        };

        return TimedSequencePlayerModuleFactory;
    }
);