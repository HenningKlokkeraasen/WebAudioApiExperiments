/*
	App
*/
define([
	'/_studio/app/ModuleRenderer.js'
	], function(
		ModuleRenderer) {
		function App() {
			this.xhrFacade = undefined;
			this.master = undefined;
		}

		App.prototype.init = function() {
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

			this.loadRack();

			// finished initializing, notify others
			//var isInitializedEvent = new CustomEvent('appIsInitialized', { detail : { instance : this } });
			//document.dispatchEvent(isInitializedEvent);

			console.log('all loaded');
		};

		App.prototype.loadRack = function() {
			this.loadModules();

			// TODO
			if (this.board.usesSynthAndKeyboard)
				this.initSynthAndKeyboard();
		};

		App.prototype.loadModules = function() {
			document.querySelector('#boardTitle').innerText = this.board.title;
			document.querySelector('#boardDescription').innerText = this.board.description;

			// console.log('loading modules');

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

		// TODO
		App.prototype.initSynthAndKeyboard = function() {
			var synth = new Synthesizer(this.master.audioContext);
			new KeyboardController(synth);
			// this.initKeysLegendFloatingLayout();
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

		App.prototype.initPatcher = function() {
			// The Patcher represents the Audio Graph
			// TODO improve
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

		return App;
	}
);