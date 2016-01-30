define([
	'/_studio/Modules/_GenericController.js'
	], function(GenericController) {
		
		WebMidiInputController.prototype = Object.create(GenericController.prototype); // new GenericController();
		WebMidiInputController.prototype.constructor = WebMidiInputController;

		function WebMidiInputController(master, patcher) {
			GenericController.call(this, master, patcher);
		}

		WebMidiInputController.prototype.render = function(definition, model, containerSelector) {
			GenericController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()

			this.facadeInstance.initKeyboard(document.getElementById('keyboardNoteInput'));
		};

		return WebMidiInputController;
	}
);