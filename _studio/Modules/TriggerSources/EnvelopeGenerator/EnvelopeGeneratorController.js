define([
	'/_studio/Modules/_ButtonTriggeredModuleController.js',
	], function(ButtonTriggeredModuleController) {

		EnvelopeGeneratorController.prototype = Object.create(ButtonTriggeredModuleController.prototype); // new ButtonTriggeredModuleController();
		EnvelopeGeneratorController.prototype.constructor = EnvelopeGeneratorController;

		function EnvelopeGeneratorController(master, patcher) {
			ButtonTriggeredModuleController.call(this, master, patcher);
		}

		EnvelopeGeneratorController.prototype.bindStartStopButton = function(button, div) {
			var facade = this.findTheFacade(div);
			var dataContainer = this.findTheDataContainer(div);

			$(button).bind('click',  function() {
				if (!$(dataContainer).data('isPlaying')) {

					console.log("EG will trigger");
					$(dataContainer).data('isPlaying', true);

					$(button).text('Stop');

					facade.initGateOn();
				}
				else {
					facade.initGateOff();
					$(dataContainer).data('isPlaying', false);
					$(button).text('Start');
				}
			});
		}

		return EnvelopeGeneratorController;
	}
);