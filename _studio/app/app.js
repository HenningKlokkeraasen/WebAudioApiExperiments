/*
	App
*/
define([
	// Facades to browser APIs
    '/_BrowserApiFacades/UserMediaFacade.js',
	'/_BrowserApiFacades/SessionStorageFacade.js',
	'/_BrowserApiFacades/QueryStringFacade.js',

	'/_studio/app/ModuleRenderer.js'
	], function(
		UserMediaFacade,
		SessionStorageFacade,
		QueryStringFacade,
		ModuleRenderer) {
		// TODO STUFF NOT IN USE
		//
		// MASTER OUTPUT
		//
		//controller.render(mixerModuleDefinition, mixerModules);

		//
		// CUSTOM MODIFIERS
		//
		//controller.render(envelopeGeneratorModuleDefinition, envelopeGeneratorModules);

		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		function App() {
			this.xhrFacade = undefined;
			this.sessionStorageFacade = undefined;
			this.master = undefined;
		}

		App.prototype.init = function() {
			console.log('starting');


			//
			// SESSION STORAGE (HTML5 WEB STORAGE)
			//

			this.sessionStorageFacade = new SessionStorageFacade();
			if (!this.sessionStorageFacade.sessionStorageIsAvailable) {
				console.error('Session storage is NOT available');
				return;
			}
			console.log('Session storage is available');
			
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

			//
			// LOAD THE BOARD
			//
			if (this.board.isAudioBufferPage)
				this.loadSoundFiles();
			else {
				// if (this.board.shouldLoadImpulseBuffers) {
				// 	var app = this;
				// 	this.loadImpulseBuffers(function() { 
				// 		app.continueLoading();
				// 	});
				// }
				// else {
					this.continueLoading();
				// }
			}
			// finished initializing, notify others
			//var isInitializedEvent = new CustomEvent('appIsInitialized', { detail : { instance : this } });
			//document.dispatchEvent(isInitializedEvent);

			console.log('all loaded');
		};

		App.prototype.continueLoading = function() {
			this.loadModules();
			if (this.board.usesSynthAndKeyboard)
				this.initSynthAndKeyboard();
		};

		//
		// App prototype
		//
		

		

		App.prototype.loadModules = function() {

			document.querySelector('#boardTitle').innerText = this.board.title;
			document.querySelector('#boardDescription').innerText = this.board.description;

			console.log('loading modules');

			this.initPatcher();
			
			var rackData = this.board.rackData;
			if (rackData == undefined) {
				console.error('No rackData found');
				return;
			}

			new ModuleRenderer(this).renderModules(rackData);

			this.initPatchCables();

			this.initFloatingLayouts();
		};

		

		App.prototype.initSynthAndKeyboard = function() {
			var synth = new Synthesizer(this.master.audioContext);
			new KeyboardController(synth);
			// this.initKeysLegendFloatingLayout();
		};

		App.prototype.initPatchCables = function() {
			
			//
			// PATCH CABLES
			//

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

		App.prototype.initPatcher = function() {
			
			//
			// PATCHER (AUDIO GRAPH)
			//

			this.patcher = new Patcher();
		};

		App.prototype.initFloatingLayouts = function() {
			new LayoutController('.oscilloscopeCanvasContainer', '#oscilloscopeContainerFloating', '>canvas');
			new LayoutController('.freqSpectrumAnalyserCanvasContainer', '#freqAnalyserContainerFloating', '>canvas');
			//new LayoutController('#audioParamModifierContainer', '#audioParamModiferContainerFloating', '>div');
			new LayoutController('#legendContainer', '#legendContainerFloating', '>div');
			new LayoutController('#patchCableControlContainer', '#patchCableControlContainerFloating', '>div');
			new LayoutController('#keysLegendContainer', '#keysLegendContainerFloating', '>article');
		};

		App.prototype.initKeysLegendFloatingLayout = function() {
			// new LayoutController('#keysLegendContainer', '#legendContainerFloating', '>article');
		};
		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return App;
	}
);