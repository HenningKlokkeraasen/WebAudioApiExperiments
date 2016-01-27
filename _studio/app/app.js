/*
	App
*/
define([
    '/_studio/app/RackRenderer.js'
	], function(
		RackRenderer) {
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

			this.initPatcher();
            
			new RackRenderer().loadRack(this.board, this.master, this.patcher);

			this.initPatchCables();

			this.initFloatingLayouts();
            
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