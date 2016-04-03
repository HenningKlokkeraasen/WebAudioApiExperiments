
define([
	'/_studio/app/ModuleRenderer.js',
	], function(ModuleRenderer) {
		function RackRenderer() {
			
		};

		RackRenderer.prototype.loadRack = function(board, master, patcher,  audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController) {
            this.board = board;
			this.loadModules(master, patcher,  audioPatchController, triggerPatchController, 
				modulationPatchController, frequencyPatchController);
			
			// TODO
			if (this.board.usesSynthAndKeyboard)
				this.initSynthAndKeyboard(master.audioContext);
		};

		RackRenderer.prototype.loadModules = function(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController) {
			document.querySelector('#boardTitle').innerText = this.board.title;
			// document.querySelector('#boardDescription').innerText = this.board.description;
			var parsedHtml = $.parseHTML(this.board.description);
			$('#boardDescription').append(parsedHtml);
			// console.log('loading modules');

			var rackData = this.board.rackData;
			if (rackData == undefined) {
				console.error('No rackData found');
				return;
			}

			new ModuleRenderer(master, patcher, audioPatchController, triggerPatchController, 
				modulationPatchController, frequencyPatchController)
				.renderModules(rackData);

		};

		// TODO
		RackRenderer.prototype.initSynthAndKeyboard = function(audioContext) {
			var synth = new Synthesizer(audioContext);
			new KeyboardController(synth);
		};

		return RackRenderer;
	}
);