
/*


	Controller for button triggered modules
	Inherits GenericController

*/

ButtonTriggeredModuleController.prototype = Object.create(GenericController.prototype); // new GenericController();
ButtonTriggeredModuleController.prototype.constructor = ButtonTriggeredModuleController;

function ButtonTriggeredModuleController(master, patcher) {
	GenericController.call(this, master, patcher);
}

ButtonTriggeredModuleController.prototype.render = function(definition, model, containerSelector) {
	GenericController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()

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
