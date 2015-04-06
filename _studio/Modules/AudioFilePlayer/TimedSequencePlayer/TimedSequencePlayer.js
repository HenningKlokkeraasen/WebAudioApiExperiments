define([
	


	// Controllers: responsible for binding the view and model
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayerController.js',

	// Data (model) for basic modules
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayerModuleFactory.js',

	// Data store
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayerModuleDataStore.js'
	], function(Controller, ModuleFactory, DataStore) {
		return { Controller: Controller, ModuleFactory: ModuleFactory, Modules : DataStore.Modules };
	}
);