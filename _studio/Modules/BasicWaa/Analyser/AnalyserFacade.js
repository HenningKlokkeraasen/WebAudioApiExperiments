/*
	Web Audio API wrapper - bind stream and oscilloscope
*/
define([
	], function() {
		function AnalyserFacade(audioContext) {
			this.input = audioContext.createAnalyser(); // Note spelling of Analyser
			this.isStopped = true;
			return this;
		}

		AnalyserFacade.prototype.toggleStartStop = function() {
			if (this.isStopped)
				this.init();
			else
				this.stop();
		}

		AnalyserFacade.prototype.init = function() {
			this.isStopped = false;
			// console.log('connecting input to oscilloscope');
			
			// Connect graph
			if (this.oscilloscope != undefined)
				this.oscilloscope.init(this.input);
			if (this.freqSpectrumAnalyser != undefined)
				this.freqSpectrumAnalyser.init(this.input);


			return this;
		}

		AnalyserFacade.prototype.stop = function() {
			this.isStopped = true;
			this.input.disconnect(); // todo
			if (this.oscilloscope != undefined)
				this.oscilloscope.stop();
			if (this.freqSpectrumAnalyser != undefined)
				this.freqSpectrumAnalyser.stop();
			return this;
		}

		//TODO move to base class
		AnalyserFacade.prototype.connect = function(destination) {
			this.input.connect(destination);
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
