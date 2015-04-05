define([
	'/_studio/Modules/_GenericController.js',
    '/_studio/app/AudioFileLoader.js'
	], function(GenericController, AudioFileLoader) {
		AudioFileLoadingModuleController.prototype = Object.create(GenericController.prototype); // new GenericController();
		AudioFileLoadingModuleController.prototype.constructor = AudioFileLoadingModuleController;

		function AudioFileLoadingModuleController(master, patcher) {
			GenericController.call(this, master, patcher);
			this.buffers = undefined;
		}

		AudioFileLoadingModuleController.prototype.render = function(definition, model, containerSelector) {
			var self = this;
			model.forEach(function(module){
				// console.debug(module.audioFilePaths);
				self.loadFilesIntoAudioBuffers(module.audioFilePaths, definition, model, containerSelector);
			});
		};

		AudioFileLoadingModuleController.prototype.loadFilesIntoAudioBuffers = function(audioFilePaths, definition, model, containerSelector) {
            var self = this;
            new AudioFileLoader().loadAudioFilesIntoBuffers(this.master.audioContext, audioFilePaths,
                // callback
                function(buffers){
                	self.filesHaveBeenLoaded(buffers, definition, model, containerSelector);
                });
        };

        AudioFileLoadingModuleController.prototype.filesHaveBeenLoaded = function(audioBuffers, definition, model, containerSelector){
			// console.debug('AudioFileLoadingModuleController: audio files have loaded');
            // console.debug(audioBuffers);

        	// TODO support more than one module, currently all modules will have the same buffer []
        	// TODO support more than one module, currently all modules will be rendered when the first module's files have been downloaded
        	this.buffers = audioBuffers;
        	GenericController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()

        	this.readyToContinueRendering();
        }

		AudioFileLoadingModuleController.prototype.createFacadeInstance = function(facade, audioContext) {
			// console.debug('AudioFileLoadingModuleController buffers:');
			// console.debug(this.buffers);
			// create an instance of the facade
			var facadeInstance = new facade(audioContext, this.buffers);
			
			return facadeInstance;
		};

		AudioFileLoadingModuleController.prototype.readyToContinueRendering = function() {
			
		};

		return AudioFileLoadingModuleController;
	}
);