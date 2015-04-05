define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerController.js',

	// Data (model) for basic modules
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerModuleFactory.js',

	// Data store
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);