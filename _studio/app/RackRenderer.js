define(['app/ModuleRenderer',
], function(ModuleRenderer) {
	class RackRenderer {
		constructor(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController,
			loader) {
			this.master = master;
			this.patcher = patcher;
			this.audioPatchController = audioPatchController;
			this.triggerPatchController = triggerPatchController;
			this.modulationPatchController = modulationPatchController;
			this.frequencyPatchController = frequencyPatchController;
			this.loader = loader;
		}

		loadRack(board) {
            this.board = board;
            this.loadTitleAndDescription();
			this.loadModules();
			this.loadRackNames();
			
			// TODO
			if (this.board.usesSynthAndKeyboard)
				this.initSynthAndKeyboard(master.audioContext);
		}

		loadTitleAndDescription() {
			document.querySelector('#boardTitle').innerText = this.board.title;
			// document.querySelector('#boardDescription').innerText = this.board.description;
			var parsedHtml = $.parseHTML(this.board.description);
			$('#boardDescription').append(parsedHtml);
			// console.log('loading modules');
		}

		loadModules() {
			var rackData = this.board.rackData;
			if (rackData == undefined) {
				console.error('No rackData found');
				return;
			}

			new ModuleRenderer(this.master, this.patcher, 
				this.audioPatchController, this.triggerPatchController, 
				this.modulationPatchController, this.frequencyPatchController)
				.renderModules(rackData);
		}

		loadRackNames() {
			if (this.board.rackNames == undefined)
				return;

			var self = this;
			// TODO use HBS, Angular, Require or Web Components
			var mountNode = document.querySelector('#rackNames');
			var nodeUl = document.createElement('ul');
			mountNode.appendChild(nodeUl);
			this.board.rackNames.forEach(function(rackName) {
				var nodeA = document.createElement('a');
				var nodeLi = document.createElement('li');
				nodeA.innerText = rackName;
				nodeLi.appendChild(nodeA);
				nodeUl.appendChild(nodeLi);
				nodeA.addEventListener('click', function() {
					var rackName = this.innerText;
					self.loader.requireRack(rackName, function(rack) {
						self.loadRack(rack);
					});
				})
			});
		}

		// TODO
		initSynthAndKeyboard(audioContext) {
			var synth = new Synthesizer(audioContext);
			new KeyboardController(synth);
		}
	}
	return RackRenderer;
});