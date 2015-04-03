// DOWNLOAD AND DECODE SOUND FILES
define([
	'/_WebAudioApiFacades/BufferFacade.js'
	], function(BufferFacade) {
		function AudioFileLoader() {
			this.loadImpulseBuffers = function(audioContext, filePaths, callback) {
				console.debug('load filePaths');
				console.debug(filePaths);

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