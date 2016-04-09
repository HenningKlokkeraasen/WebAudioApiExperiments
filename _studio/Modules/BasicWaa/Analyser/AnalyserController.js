/*
	Controller for Analyser
*/
define([
	'/_studio/Modules/_GenericController.js',
	'BrowserApiWrappers/CanvasFacade',
	'/_studio/Modules/Composite/AudioVisualizer/Oscilloscope.js',
	'/_studio/Modules/Composite/AudioVisualizer/FrequencySpectrumAnalyser.js'
	], function(GenericController, CanvasFacade) {	
		AnalyserController.prototype = Object.create(GenericController.prototype);
		AnalyserController.prototype.constructor = AnalyserController;

		function AnalyserController(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController, facadeHolder) {
			GenericController.call(this, master, patcher, audioPatchController, triggerPatchController, 
				modulationPatchController, frequencyPatchController, facadeHolder);
		}

		// override
		AnalyserController.prototype.render = function(definition, model, containerSelector, callback) {
			GenericController.prototype.render.call(this, definition, model, containerSelector, callback); //  = base.render()

			var controller = this;
			// Go through each of the modules in the container
			$(containerSelector + '>div').each(function() {
				var div = this;

				// specific for AnalyserController
				// init canvas
				if (model[0].hasOscilloscope)
					controller.initCanvasForOscilloscope(div);
				if (model[0].hasFsa)
					controller.initCanvasForFreqSpectrumAnalyser(div);
			});
		};

		AnalyserController.prototype.initCanvasForOscilloscope = function(div) {
			var canvasElement = $(div).find('.oscilloscopeCanvasContainer canvas')[0];
			var canvasFacade = new CanvasFacade(canvasElement, 400, 180);
			var oscilloscope = new Oscilloscope(canvasFacade);
			var facade = this.findTheFacade(div);
			facade.setOscilloscope(oscilloscope);
		};

		AnalyserController.prototype.initCanvasForFreqSpectrumAnalyser = function(div) {
			var canvasElement = $(div).find('.freqSpectrumAnalyserCanvasContainer canvas')[0];
			var canvasFacade = new CanvasFacade(canvasElement, 400, 180);
			var freqSpectrumAnalyser = new FrequencySpectrumAnalyser(canvasFacade);
			var facade = this.findTheFacade(div);
			facade.setFreqSpectrumAnalyser(freqSpectrumAnalyser);
		};

		return AnalyserController;
	}
);