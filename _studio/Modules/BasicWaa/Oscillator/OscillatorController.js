define([
	'/_studio/Modules/_ButtonTriggeredModuleController.js',
	], function(ButtonTriggeredModuleController) {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////	
		OscillatorController.prototype = Object.create(ButtonTriggeredModuleController.prototype); // new ButtonTriggeredModuleController();
		OscillatorController.prototype.constructor = OscillatorController;

		function OscillatorController(master, patcher) {
			ButtonTriggeredModuleController.call(this, master, patcher);
		}

		OscillatorController.prototype.bindStartStopButton = function(button, div) {
			var facade = this.findTheFacade(div);
			var dataContainer = this.findTheDataContainer(div);

			$(button).bind('click',  function() {
				if (!$(dataContainer).data('isPlaying')) {

					// Start playing
					console.log("Oscillator of wave " + 
						facade.node.type + 
						" starts playing at " +
						facade.node.frequency.value +
						"Hz, with detune " +
						facade.node.detune.value);
					//console.log(facade);
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
		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return OscillatorController;
	}
);