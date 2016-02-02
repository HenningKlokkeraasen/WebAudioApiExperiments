define([
	'/_studio/Modules/_GenericController.js'
	], function(GenericController) {
		
		WebMidiInputController.prototype = Object.create(GenericController.prototype); // new GenericController();
		WebMidiInputController.prototype.constructor = WebMidiInputController;

		function WebMidiInputController(master, patcher, facadeHolder) {
			GenericController.call(this, master, patcher, facadeHolder);
		}

		WebMidiInputController.prototype.render = function(definition, model, containerSelector, callback) {
			GenericController.prototype.render.call(this, definition, model, containerSelector, callback); //  = base.render()

			this.facadeInstance.initKeyboard(document.getElementById('keyboardNoteInput'));
		};

		return WebMidiInputController;
	}
);