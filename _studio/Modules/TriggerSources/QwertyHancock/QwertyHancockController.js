define([
	'/_studio/Modules/_GenericController.js',
	'/_thirdparty/qwerty-hancock.js'
	], function(GenericController) {
		
		QwertyHancockController.prototype = Object.create(GenericController.prototype); // new GenericController();
		QwertyHancockController.prototype.constructor = QwertyHancockController;

		function QwertyHancockController(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController, facadeHolder) {
			GenericController.call(this, master, patcher, audioPatchController, triggerPatchController, 
				modulationPatchController, frequencyPatchController, facadeHolder);
		}

		QwertyHancockController.prototype.render = function(definition, model, containerSelector, callback) {
			GenericController.prototype.render.call(this, definition, model, containerSelector, callback); //  = base.render()

			var keyboard = new QwertyHancock({
                 id: 'keyboard',//TODO let the value be a property of model and set by the factory with value in data store
                 width: 600,
                 height: 150,
                 octaves: 2,
                 startNote: 'A3',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#f3e939'
            });

			this.facadeInstance.initKeyboard(keyboard, document.getElementById('keyboardNoteInput'));
		};

		return QwertyHancockController;
	}
);