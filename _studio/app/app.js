/*
	App
*/
define([
    '/_studio/app/RackRenderer.js',
	'/_Patching/Patcher.js',
	'/_Patching/Controllers/PatchController.js'
	], function(
		RackRenderer,
		Patcher,
		PatchController) {
		function App() {
			this.xhrFacade = undefined;
			this.master = undefined;
		}

		App.prototype.init = function(board) {
			console.log('starting');

			//
			// AUDIO CONTEXT - ENTRY POINT OF WEB AUDIO API
			//
			this.master = new AudioContextFacade();
			if (!this.master.WebAudioApiIsEnabled) {
				console.error('Web Audio is NOT available');
				return;
			}
			console.log('Web Audio is available');
			//console.log(this.master.audioContext);

			var patcher = new Patcher();
			var audioPatchController = new PatchController();
			var triggerPatchController = new PatchController();
			var modulationPatchController = new PatchController();
            var frequencyPatchController = new PatchController();
			
			new RackRenderer().loadRack(board, this.master, patcher, 
				audioPatchController, triggerPatchController, modulationPatchController, frequencyPatchController);

			this.initPatchCables();
            
			// finished initializing, notify others
			//var isInitializedEvent = new CustomEvent('appIsInitialized', { detail : { instance : this } });
			//document.dispatchEvent(isInitializedEvent);

			console.log('all loaded');
		};

		App.prototype.initPatchCables = function() {
			//PatchCableController.prototype.hidePatchCables();
			$('#showPatchCablesCheckbox').bind('change', function() {
				if($(this).is(':checked')) {
					PatchCableController.prototype.showPatchCables();
				}
				else {
					PatchCableController.prototype.hidePatchCables();
				}
			});
		};

		return App;
	}
);