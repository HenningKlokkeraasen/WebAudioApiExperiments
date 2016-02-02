define([
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerController.js'
	], function(AudioFilePlayerController) {
		TimedSequencePlayerController.prototype = Object.create(AudioFilePlayerController.prototype); // new ButtonTriggeredModuleController();
		TimedSequencePlayerController.prototype.constructor = TimedSequencePlayerController;

		function TimedSequencePlayerController(master, patcher, facadeHolder) {
			AudioFilePlayerController.call(this, master, patcher, facadeHolder); // base()
		}

		TimedSequencePlayerController.prototype.render = function(definition, model, containerSelector, callback) {
			modules = model;
			this.sequences = modules.map(function(module){ return module.sequences; });
			// console.debug(this.sequences);
			AudioFilePlayerController.prototype.render.call(this, definition, model, containerSelector, callback); //  = base.render()
		};

		TimedSequencePlayerController.prototype.createFacadeInstance = function(facade, audioContext) {
			// console.debug('TimedSequencePlayerController sequences:');
			// console.debug(this.sequences);
			// create an instance of the facade
			var facadeInstance = new facade(audioContext, this.buffers, this.sequences);
			
			return facadeInstance;
		};

		// called after base class callbacks are done
		TimedSequencePlayerController.prototype.readyToContinueRendering = function(renderedModules, callback) {
			AudioFilePlayerController.prototype.readyToContinueRendering.call(this, renderedModules, callback); //  = base.readyToContinueRendering()
		};

		TimedSequencePlayerController.prototype.bindButtons = function(buttons, div) {
			// console.debug('bind buttons');
			// console.debug(this);
			var facade = this.findTheFacade(div);

			this.facade = facade;
			this.buttons = buttons;

			var controller = this;

			$(buttons).each(function(key, button) {
				$(button).bind('click',  function() {
					// console.debug(this);
					// Start playing
					// console.log("Button with name " + 
					// 	$(this).text() + 
					// 	" file path " +
					// 	$(this).attr('name')
					// );
					//console.log(facade);

					controller.playSequence(this);
				});
			});
		}

		TimedSequencePlayerController.prototype.playSequence = function(button) {
			var name = $(button).attr('name');
			// var url = $(button).data('url');
			// console.debug('name: ' + name );
			var facade = this.facade;
			var source = facade.playSequence(name);
		};

		return TimedSequencePlayerController;
	}
);