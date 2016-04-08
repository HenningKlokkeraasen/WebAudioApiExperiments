// DOWNLOAD AND DECODE SOUND FILES
define([
	'WaapiWrappers/BufferFacade'
	], function(BufferFacade) {
		function AudioFileLoader() {
			this.loadAudioFilesIntoBuffers = function(audioContext, filePaths, callback) {
				// console.debug('load filePaths');
				// console.debug(filePaths);

				var bufferer = new BufferFacade(audioContext);
				
				bufferer.bufferAudioFiles(filePaths, 
					// callback from the bufferer
					function(buffers) {
						// carry on after all sounds are donwloaded and decoded
						callback(buffers);
				});
			}
		};

		return AudioFileLoader;
	}
);