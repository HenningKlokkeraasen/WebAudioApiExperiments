define([
	'/_studio/Modules/_AudioFileLoadingModuleController.js',
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerKeyboardController.js',
	], function(AudioFileLoadingModuleController, KeyboardController) {
		AudioFilePlayerController.prototype = Object.create(AudioFileLoadingModuleController.prototype); // new ButtonTriggeredModuleController();
		AudioFilePlayerController.prototype.constructor = AudioFilePlayerController;

		function AudioFilePlayerController(master, patcher) {
			new KeyboardController(this, this.numberKeyPressed, this.numberKeyReleased);
			AudioFileLoadingModuleController.call(this, master, patcher);
		}

		AudioFilePlayerController.prototype.render = function(definition, model, containerSelector) {
			this.containerSelector = containerSelector;

			AudioFileLoadingModuleController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()
		};

		// called after base class callbacks are done
		AudioFilePlayerController.prototype.readyToContinueRendering = function() {
			var controller = this;

			// Go through each of the modules in the container
			$(this.containerSelector + '>div').each(function() {
				var moduleDiv = this;
				
				// specific for this controller
				// button to start/stop a sound
				var buttons = controller.findTheButtons(moduleDiv);
				controller.bindButtons(buttons, moduleDiv);
			});
		};

		AudioFilePlayerController.prototype.findTheButtons = function(div) {
			var buttonSelector = 'button';
			return $(div).find(buttonSelector);
		};

		AudioFilePlayerController.prototype.bindButtons = function(buttons, div) {
			var facade = this.findTheFacade(div);

			this.facade = facade;
			this.buttons = buttons;

			var controller = this;

			// var dataContainer = this.findTheDataContainer(div);

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

					controller.playOrLoopOrStop(this);
				});
			});
		}

		AudioFilePlayerController.prototype.playOrLoopOrStop = function(button) {
			var name = $(button).attr('name');
			// var url = $(button).data('url');
			// console.debug('name: ' + name + ' url: ' + url);
			var facade = this.facade;
			if (facade.isLooping()) {
				if (!$(button).data('isPlaying')) {
					var source = facade.playSoundLooped(name);
					//console.log(source);
					$(button).data('source', source);
					$(button).data('isPlaying', true);
				}
				else{
					facade.stopPlaying($(button).data('source'));
					$(button).data('isPlaying', false);
				}
			} else {
				if ($(button).data('isPlaying')) {
					if ($(button).data('source'))
						facade.stopPlaying($(button).data('source'));
				}
				var source = facade.playSound(name);
				$(button).data('source', source);
			}
		};

		AudioFilePlayerController.prototype.numberKeyPressed = function(key) {
			var index = key - 1;
			var button = this.buttons[index];
			if (!button)
				return;
			this.playOrLoopOrStop(button);
			$(button).addClass('activeToGetTheSameEffectWhenTriggeredFromDom');
		};

		AudioFilePlayerController.prototype.numberKeyReleased = function(key) {
			var index = key - 1;
			var button = this.buttons[index];
			if (!button)
				return;
			$(button).removeClass('activeToGetTheSameEffectWhenTriggeredFromDom');
		};

		return AudioFilePlayerController;
	}
);