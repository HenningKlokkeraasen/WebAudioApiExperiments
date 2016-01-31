define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, LFO) {
		return {
			title : 'Frequency Modulation / Tremolo',
			description : 'This rack shows modulation of an oscillator with an LFO. '
				+'The LFO modulates the oscillators frequency. This is known as FM. The effect is also known as a vibrato effect.'
				
				,
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: LFO, id: 'lfo1' },
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
					{ from: 'lfo1', to: 'osc5', type: 'control' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
