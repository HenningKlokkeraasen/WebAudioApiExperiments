
console.debug('in play');

define([
	// Built on top of Web Audio API
	'js/ApiFacades/Other/DrumMachine.js',
	'js/ApiFacades/Other/Player.js',

	// Controllers: responsible for binding the view and model
	'js/Controllers/Other/DrumMachineController.js',

	// Data (model) for modules
	'js/ModuleData/WaaCustom/DrumMachineModule.js',

	], function() {
		console.debug('dependencies for play.js loaded');

		App.prototype.board = {
			isAudioBufferPage : true
		};

		App.prototype.loadSoundFiles = function() {
			console.log('load sound files');

			//
			// BUFFERER - DOWNLOAD AND DECODE SOUND FILES
			//

			this.bufferer = new BufferFacade(this.xhrFacade, this.master.audioContext);
			var sounds = [];
			$('#manualDrumButtons button').each(function() {
				sounds.push($(this).data('url'));
			});
			$('#filterButtons button').each(function() {
				sounds.push($(this).data('url'));
			});
			var all = sounds;

			var app = this;

			this.bufferer.bufferAudioFiles(all, 
				// callback
				function() {
					// Hold the buffers
					app.master.buffers = app.bufferer.buffers;
					delete app.bufferer;
					// carry on after all sounds are donwloaded and decoded
					app.carryOnAfterSoundFilesBuffered();
			});
		};

		App.prototype.carryOnAfterSoundFilesBuffered = function() {
			//console.log('carrying on');

			//
			// PLAYER
			//

			this.player = new Player(this.master.audioContext, this.master.buffers);

			var app = this;

			// bind events - manual buttons
			$('#manualDrumButtons button').each(function() {
				$(this).bind('click',  function() {
					app.player.playSound($(this).data('url'));
					console.log($(this).data('url'));
				});
			})

			this.drumMachineController = new DrumMachineController(this.master, this.player, this.sessionStorageFacade);
			this.drumMachineController.render(drumMachineModuleDefinition, drumMachineModules);

			//
			// LOOPING
			//

			// bind events
			$('#filterButtons button').each(function() {
				$(this).bind('click',  function() {
					if (!$(this).data('isPlaying')) {
						var source = app.player.playSoundLooped($(this).data('url'), true);
						//console.log(source);
						$(this).data('source', source);
						$(this).data('isPlaying', true);
					}
					else{
						app.player.stopPlaying($(this).data('source'));
						$(this).data('isPlaying', false);
					}
				});
			})

		};
	}
);
