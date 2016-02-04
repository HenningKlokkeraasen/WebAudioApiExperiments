define([
	'/_studio/Modules/_GenericController.js',
    '/_studio/app/AudioFileLoader.js'
	], function(GenericController, AudioFileLoader) {
		AudioFileLoadingModuleController.prototype = Object.create(GenericController.prototype); // new GenericController();
		AudioFileLoadingModuleController.prototype.constructor = AudioFileLoadingModuleController;

		function AudioFileLoadingModuleController(master, patcher, audioPatchController, triggerPatchController, controlPatchController, facadeHolder) {
			GenericController.call(this, master, patcher, audioPatchController, triggerPatchController, controlPatchController, facadeHolder);
			this.buffers = undefined;
		}

		AudioFileLoadingModuleController.prototype.render = function(definition, model, containerSelector, callback) {
			var self = this;
			model.forEach(function(module) {
				// console.debug(module.audioFilePaths);
				self.loadFilesIntoAudioBuffers(module.audioFilePaths, definition, model, containerSelector, callback);
			});
		};

		AudioFileLoadingModuleController.prototype.loadFilesIntoAudioBuffers = function(audioFilePaths, definition, model, containerSelector, callback) {
            var self = this;
            new AudioFileLoader().loadAudioFilesIntoBuffers(this.master.audioContext, audioFilePaths,
                function(buffers) {
                	self.filesHaveBeenLoaded(buffers, definition, model, containerSelector, callback);
                });
        };

        AudioFileLoadingModuleController.prototype.filesHaveBeenLoaded = function(audioBuffers, definition, model, containerSelector, callback) {
			// console.debug('AudioFileLoadingModuleController: audio files have loaded');
            // console.debug(audioBuffers);

        	// TODO support more than one module, currently all modules will have the same buffer []
        	// TODO support more than one module, currently all modules will be rendered when the first module's files have been downloaded
        	this.buffers = audioBuffers;
			var self = this;
        	GenericController.prototype.render.call(this, definition, model, containerSelector, function(renderedModules) {
				self.readyToContinueRendering(renderedModules, callback);
				}); //  = base.render()
        }
		
		AudioFileLoadingModuleController.prototype.readyToContinueRendering = function(renderedModules, callback) {
			callback(renderedModules);
		};

		AudioFileLoadingModuleController.prototype.createFacadeInstance = function(facade, audioContext) {
			// console.debug('AudioFileLoadingModuleController buffers:');
			// console.debug(this.buffers);
			// create an instance of the facade
			var facadeInstance = new facade(audioContext, this.buffers);
			
			return facadeInstance;
		};

		return AudioFileLoadingModuleController;
	}
);