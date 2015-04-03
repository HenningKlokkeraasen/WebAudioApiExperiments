/*
	Web Audio API wrapper - bind stream and oscilloscope
*/
define([
	], function() {
		function AnalyserFacade(audioContext) {
			this.node = audioContext.createAnalyser(); // Note spelling of Analyser
			this.isStopped = true;




			return this;
		}

		AnalyserFacade.prototype.init = function() {
			this.isStopped = false;
			console.log('connecting input to oscilloscope');
			
			// Connect graph
			this.oscilloscope.init(this.node);
			this.freqSpectrumAnalyser.init(this.node);




			return this;
		}

		AnalyserFacade.prototype.stop = function() {
			this.isStopped = true;
			this.node.disconnect(); // todo
			this.oscilloscope.stop();
			this.freqSpectrumAnalyser.stop();
			return this;
		}

		//TODO move to base class
		AnalyserFacade.prototype.connect = function(destination) {
			this.node.connect(destination);
			return this;
		}

		AnalyserFacade.prototype.setOscilloscope = function(oscilloscope) {
			this.oscilloscope = oscilloscope;
		};

		AnalyserFacade.prototype.setFreqSpectrumAnalyser = function(freqSpectrumAnalyser) {
			this.freqSpectrumAnalyser = freqSpectrumAnalyser;
		};

		return AnalyserFacade;
	}
);
