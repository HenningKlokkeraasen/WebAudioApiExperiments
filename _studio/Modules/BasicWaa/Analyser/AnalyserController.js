/*
	Controller for Analyser
*/
define([
	'/_studio/Modules/_ButtonTriggeredModuleController.js',
	'/_BrowserApiFacades/CanvasFacade.js',
	'/_studio/Modules/Composite/AudioVisualizer/Oscilloscope.js',
	'/_studio/Modules/Composite/AudioVisualizer/FrequencySpectrumAnalyser.js'
	], function(ButtonTriggeredModuleController) {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////	
		AnalyserController.prototype = Object.create(ButtonTriggeredModuleController.prototype); // new ButtonTriggeredModuleController();
		AnalyserController.prototype.constructor = AnalyserController;

		function AnalyserController(master, patcher) {
			ButtonTriggeredModuleController.call(this, master, patcher);
		}

		AnalyserController.prototype.bindStartStopButton = function(button, div) {
			var facade = this.findTheFacade(div);
			var dataContainer = this.findTheDataContainer(div);

			$(button).bind('click',  function() {
				if (facade.isStopped) {
					facade.init();
					$(this).text('Stop');
				}
				else {
					facade.stop();
					$(this).text('Start');
				}
			});













		}

		// override
		AnalyserController.prototype.render = function(definition, model, containerSelector) {
			ButtonTriggeredModuleController.prototype.render.call(this, definition, model, containerSelector); //  = base.render()

			var controller = this;
			// Go through each of the modules in the container
			$(containerSelector + '>div').each(function() {
				var div = this;

				// specific for AnalyserController
				// init canvas
				controller.initCanvasForOscilloscope(div);
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

		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return AnalyserController;
	}
);