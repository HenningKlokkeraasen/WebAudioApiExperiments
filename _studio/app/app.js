/*
	App
*/
define([
    'app/RackRenderer',
	'Patching/Patcher',
	'Patching/Controllers/PatchController'
	], function(
	RackRenderer,
	Patcher,
	PatchController) {
	class App {
		constructor() {
			this.xhrFacade = undefined;
			this.master = undefined;
		}

		init(board) {
			// console.log('starting');

			this.initAudioContext();

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

			// console.log('all loaded');
		}

		initAudioContext() {
			// AUDIO CONTEXT - ENTRY POINT OF WEB AUDIO API
			this.master = new AudioContextFacade();
			if (!this.master.WebAudioApiIsEnabled) {
				console.error('Web Audio is NOT available');
				return;
			}
			// console.log('Web Audio is available');
			$('#waapi-context-status-led').attr('color', 'green');
			$('#waapi-context-status-led').attr('label', '');
			$('#waapi-context-status-led').attr('tooltip', 'Web Audio is available');
			//console.log(this.master.audioContext);
		}

		initPatchCables() {
			//PatchCableController.prototype.hidePatchCables();
			$('#showPatchCablesCheckbox').bind('change', function() {
				if($(this).is(':checked')) {
					PatchCableController.prototype.showPatchCables();
				}
				else {
					PatchCableController.prototype.hidePatchCables();
				}
			});
		}

	}
	return App;
});