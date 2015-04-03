define([
	'/_studio/Modules/_GenericController.js',
    '/_studio/app/AudioFileLoader.js'
	], function(GenericController, AudioFileLoader) {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////	
		ConvolverController.prototype = Object.create(GenericController.prototype); // new GenericController();
		ConvolverController.prototype.constructor = ConvolverController;

		function ConvolverController(master, patcher) {
			GenericController.call(this, master, patcher);
			this.buffers = undefined;
		}

		ConvolverController.prototype.render = function(definition, model, containerSelector) {
			var self = this;
			model.forEach(function(module){
				console.debug(module.impulseFilePaths);
				self.loadFilesIntoAudioBuffers(module.impulseFilePaths, definition, model, containerSelector);
			});
		};

		ConvolverController.prototype.loadFilesIntoAudioBuffers = function(impulseFilePaths, definition, model, containerSelector) {
            var self = this;
            new AudioFileLoader().loadImpulseBuffers(this.master.audioContext, impulseFilePaths,
                // callback
                function(buffers){
                	self.filesHaveBeenLoaded(buffers, definition, model, containerSelector);
                });
        };

        ConvolverController.prototype.filesHaveBeenLoaded = function(audioBuffers, definition, model, containerSelector){
			console.debug('audio files have loaded');
            console.debug(audioBuffers);

        	// TODO support more than one module, currently all modules will have the same buffer []
        	// TODO support more than one module, currently all modules will be rendered when the first module's files have been downloaded
        	this.buffers = audioBuffers;
        	GenericController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()
        }

		ConvolverController.prototype.createFacadeInstance = function(facade, audioContext) {
			console.debug('is this called');
			console.debug(this.buffers);
			// create an instance of the facade
			var facadeInstance = new facade(audioContext, this.buffers);
			
			return facadeInstance;
		};

		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return ConvolverController;
	}
);