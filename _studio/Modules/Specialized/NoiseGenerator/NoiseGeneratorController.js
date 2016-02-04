/*
	Controller for noise generator
*/
define([
	'/_studio/Modules/_ButtonTriggeredModuleController.js',
	], function(ButtonTriggeredModuleController) {
		NoiseGeneratorController.prototype = Object.create(ButtonTriggeredModuleController.prototype); // new ButtonTriggeredModuleController();
		NoiseGeneratorController.prototype.constructor = NoiseGeneratorController;

		function NoiseGeneratorController(master, patcher, audioPatchController, triggerPatchController, controlPatchController, facadeHolder) {
			ButtonTriggeredModuleController.call(this, master, patcher, audioPatchController, triggerPatchController, controlPatchController, facadeHolder);
		}

		NoiseGeneratorController.prototype.bindStartStopButton = function(button, div) {
			var facade = this.findTheFacade(div);
			var dataContainer = this.findTheDataContainer(div);

			$(button).bind('click',  function() {
				if (!$(dataContainer).data('isPlaying')) {

					// Start playing






					
					$(dataContainer).data('isPlaying', true);

					$(button).text('Stop');

					facade.start();
				}
				else {
					facade.stop();
					$(dataContainer).data('isPlaying', false);
					$(button).text('Start');
				}
			});
		}

		return NoiseGeneratorController;
	}
);
