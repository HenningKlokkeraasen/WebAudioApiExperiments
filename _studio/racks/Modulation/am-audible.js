define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, LFO) {
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
						modules: [
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}	
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'filter5', type : 'audio' },
					{ from : 'filter5', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'masterSection1', type : 'audio' },
					
					// Modulation
					{ from: 'mar1', to: 'gain5', type: 'control' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
