define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, Oscillator, Filter, Gain, LFO, FinalStage) {
		return {
			title : 'Amplitude Modulation in the audible range',
			description : 'This rack shows modulation of an amplifier with a Modulator that has a frequency in the audible range. '
				+'The Modulator modulates the amplifiers volume (or the amplitude of the incoming signal).' 
				+'This is known as AM. The effect is also known as ring modulation.'
				,
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: LFO, id: 'mar1' },
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'filter5' },
							{ moduleMother: Gain, id: 'gain5' }
						],
					},
					{
						gear: [
							FinalStage
						],
						modules: [
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}	
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'filter5', type : 'audio' },
					{ from : 'filter5', to : 'gain5', type : 'audio' },
					
					// Modulation
					{ from: 'mar1', to: 'gain5', type: 'control' },
				],
				moduleToGearPatches: [
					{ gear: 'finalStage1', from: 'gain5', to: 'gain6', type: 'audio' },
				],
				gearToModulePatches: [
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser2', type: 'audio' }
				],
			},
		};
	}
);
