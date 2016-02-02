define([
	'/_studio/Modules/_GenericController.js'
	], function(GenericController) {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		ButtonTriggeredModuleController.prototype = Object.create(GenericController.prototype); // new GenericController();
		ButtonTriggeredModuleController.prototype.constructor = ButtonTriggeredModuleController;

		function ButtonTriggeredModuleController(master, patcher, facadeHolder) {
			GenericController.call(this, master, patcher, facadeHolder);
		}

		ButtonTriggeredModuleController.prototype.render = function(definition, model, containerSelector, callback) {
			GenericController.prototype.render.call(this, definition, model, containerSelector, callback); //  = base.render()

			var controller = this;
			// Go through each of the modules in the container
			$(containerSelector + ' div').each(function() {
				var div = this;

				// specific for ButtonTriggeredModuleController
				// button to start/stop a module
				var button = controller.findTheButton(div);
				controller.bindStartStopButton(button, div);
			});
		};

		ButtonTriggeredModuleController.prototype.findTheButton = function(div) {
			var buttonSelector = 'button';
			return $(div).find(buttonSelector).first();
		};

		ButtonTriggeredModuleController.prototype.bindStartStopButton = undefined;
		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return ButtonTriggeredModuleController;
	}
);