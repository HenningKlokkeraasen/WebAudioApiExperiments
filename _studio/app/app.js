/*
	App
*/
define([
    'app/RackRenderer',
	'Patching/Patcher',
	'Patching/Controllers/PatchController',
	'Patching/Controllers/PatchCableController'
	], function(
	RackRenderer,
	Patcher,
	PatchController,
	PatchCableController) {
	class App {
		constructor(rackLoader) {
			this.master = undefined;
			this.PatchCableController = new PatchCableController();
			this.rackLoader = rackLoader;
		}

		init() {
			// console.log('starting');
			this.initAudioContext();
			this.loadPatchControllers();
			this.bindTogglePatchCableVisibility();
            
			// finished initializing, notify others
			//var isInitializedEvent = new CustomEvent('appIsInitialized', { detail : { instance : this } });
			//document.dispatchEvent(isInitializedEvent);

			// console.log('all loaded');
		}

		renderRack(rack) {
			this.rackRenderer.renderRack(rack);
		}

		loadPatchControllers() {
			this.patcher = new Patcher();
			this.audioPatchController = new PatchController(this.PatchCableController);
			this.triggerPatchController = new PatchController(this.PatchCableController);
			this.modulationPatchController = new PatchController(this.PatchCableController);
            this.frequencyPatchController = new PatchController(this.PatchCableController);
            this.rackRenderer = new RackRenderer(this.master, this.patcher, 
				this.audioPatchController, this.triggerPatchController, 
				this.modulationPatchController, this.frequencyPatchController,
				this.rackLoader);
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

		bindTogglePatchCableVisibility() {
			var self = this;
			$('#showPatchCablesCheckbox').bind('change', function() {
				if($(this).is(':checked')) {
					self.PatchCableController.showPatchCables();
				}
				else {
					self.PatchCableController.hidePatchCables();
				}
			});
		}

	}
	return App;
});