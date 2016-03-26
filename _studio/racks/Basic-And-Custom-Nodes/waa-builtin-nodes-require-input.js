define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js'
	], function(Analyser, Convolver, WaveShaper, SimpleReverb) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the sound generation and modification nodes in the Web Audio API that require some sort of input to work'
			+'<br>Distortion uses the WaveShaperNode, Klang uses the ConvolverNode with impulse files, Simple Reverb uses the ConvolverNode with an in-memory buffer for the impules.'
			+'<br>The Oscilloscope and Frequency Spectrum Analyser uses the AnalyserNode and the canvas element to draw',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' }
						]
					},
					{
						modules: [
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						],
					},
				],
				patches : [
				]
			}
		};
	}
);
