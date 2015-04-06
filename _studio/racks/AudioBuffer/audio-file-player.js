define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayer.js'
	// Built on top of Web Audio API
	// 'js/ApiFacades/Other/DrumMachine.js',
	// 'js/ApiFacades/Other/Player.js',

	// // Controllers: responsible for binding the view and model
	// 'js/Controllers/Other/DrumMachineController.js',

	// // Data (model) for modules
	// 'js/ModuleData/WaaCustom/DrumMachineModule.js',
	], function(AudioDestination, Analyser, AudioFilePlayer) {
		return {
			title : 'Playing audio files',
			description : 'A drum pad. The first 8 drums are triggered by keys 1-8 on top row of keyboard. If in loop mode, press again to stop.',
			rackData : {
				rows : [

					// Audio file player

					{
						moduleCollections : [
							{
								controller : AudioFilePlayer.Controller,
								factory : AudioFilePlayer.ModuleFactory,
								modules : AudioFilePlayer.Modules.getItemsByShortName('drumpads1')
							},
						]
					},

					{
						moduleCollections : [

					// Output and analyse

							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : AudioDestination.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					},
				]
			},
		};

		// 	//
		// 	// PLAYER
		// 	//

		// 	this.player = new Player(this.master.audioContext, this.master.buffers);

		// 	var app = this;

		// 	this.drumMachineController = new DrumMachineController(this.master, this.player, this.sessionStorageFacade);
		// 	this.drumMachineController.render(drumMachineModuleDefinition, drumMachineModules);

		// 	//
		// 	// LOOPING
		// 	//

		// 	// bind events
		// 	$('#filterButtons button').each(function() {
		// 		$(this).bind('click',  function() {
		// 			if (!$(this).data('isPlaying')) {
		// 				var source = app.player.playSoundLooped($(this).data('url'), true);
		// 				//console.log(source);
		// 				$(this).data('source', source);
		// 				$(this).data('isPlaying', true);
		// 			}
		// 			else{
		// 				app.player.stopPlaying($(this).data('source'));
		// 				$(this).data('isPlaying', false);
		// 			}
		// 		});
		// 	})

		// };
	}
);
