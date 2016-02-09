/*

*/
define([
    '/_thirdparty/wavetable.js',
	], function(ChromiumWaveTableThingy) {
		
		function PeriodicWaveCreator(audioContext) {
			this.audioContext = audioContext;
		};
		
		PeriodicWaveCreator.prototype.createSineWave = function() {
			// http://stackoverflow.com/questions/20156888/what-are-the-parameters-for-createperiodicwave-in-google-chrome
			// TurtlePurtle

			// f is your fundamental frequency (equivalent to osc.frequency.value)

			// Coefficients
			var real = new Float32Array(2);
			var imag = new Float32Array(2);

			// For the real coefficients, Kr:
			real[0] = 0; // No DC offset (the amplitude of the "wave" created by cos(0 f t))
			real[1] = 1; // No cosine fundamental freq (the amplitude of the cosine wave at the fundamental frequency (cos(1 f t)))
			//real[2]    	the amplitude of the cosine wave at the 2nd harmonic (cos(2 f t))

			// For the real coefficients it's the same, except they are sine waves instead, 
			// and the 0th coefficent is ignored, since it would be the amplitude of the wave sin(0*t), which is 0 for all t.
			imag[0] = 0; //(First imaginary coeff is ignored)
			imag[1] = 0; // sine of amplitude 1 at fundamental freq

			var wave = this.audioContext.createPeriodicWave(real, imag);

			return wave;
		};

		PeriodicWaveCreator.prototype.createSawtoothWave = function() {
			// http://stackoverflow.com/questions/20156888/what-are-the-parameters-for-createperiodicwave-in-google-chrome
			// TurtlePurtle

			// f is your fundamental frequency (equivalent to osc.frequency.value)

			var numCoeffs = 64; // The more coefficients you use, the better the approximation

			// Coefficients
			var real = new Float32Array(numCoeffs);
			var imag = new Float32Array(numCoeffs);

			// For the real coefficients, Kr:
			real[0] = 0.5; // A sawtooth has DC offset of 1/2 (i.e. the first real coefficient)
			// the rest of the real coefficients are 0

			// imaginary coefficients of the form 1 / (nπ)
			for (var i = 1; i < numCoeffs; i++) { // note i starts at 1
				imag[i] = 1 / (i * Math.PI);
			}

			var wave = this.audioContext.createPeriodicWave(real, imag);

			return wave;
		};

		PeriodicWaveCreator.prototype.createSquareWave = function() {
			// same as sawtooth, except only odd harmonics

			var numCoeffs = 64;

			// Coefficients
			var real = new Float32Array(numCoeffs);
			var imag = new Float32Array(numCoeffs);

			real[0] = 0.5;

			for (var i = 1; i < numCoeffs; i++) {
				var isOdd = i % 2 != 0;
				if (isOdd)
					imag[i] = 1 / (i * Math.PI);
				else
					imag[i] = 0;
			}

			var wave = this.audioContext.createPeriodicWave(real, imag);

			return wave;
		};

		PeriodicWaveCreator.prototype.createTriangleWave = function() {
			

			var numCoeffs = 64;

			// Coefficients
			var real = new Float32Array(numCoeffs);
			var imag = new Float32Array(numCoeffs);

			real[0] = 0;
			// real[n] = 0

			for (var i = 1; i < numCoeffs; i++) {

		/*	
				imag[i] = -1 * 
					( 
						(2 * Math.pow(-1, i) * (numCoeffs * numCoeffs)) / 
						((i * i) * (numCoeffs - 1) * (Math.PI * Math.PI)) 
					)
					*
					Math.sin(
						(i * (numCoeffs -1) * Math.PI) /
						numCoeffs
					)
		*/


					
				var isOdd = i % 2 != 0;
				if (isOdd)
					imag[i] = 1 / (i * i * Math.PI);
				else
					imag[i] = 0;

				if (isOdd && (i % 4 == 0)) {
					var shift = 2 * Math.PI * 0.5; // Shift the waveform 50%
					imag[i] = imag[i] * Math.sin(shift);
				}
				
			}

			var wave = this.audioContext.createPeriodicWave(real, imag);

			return wave;
		};
		
		PeriodicWaveCreator.prototype.createChromiumWave = function(waveName, callback) {
			var self = this;
			new ChromiumWaveTableThingy(waveName, this.audioContext).load(function(wave) {
				// console.log(wave.frequencyData);
				// console.log(wave.buffers);
				var wave = self.audioContext.createPeriodicWave(wave.frequencyData.real, wave.frequencyData.imag);
				if (callback)
					callback(wave);
			});
		}

		return PeriodicWaveCreator;
	}
);
