define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, LFO, EnvelopeGenerator, QwertyHancock) {
		return {
			title : 'One of each type',
			description : '...of connection combination (audio in/out, trigger (gate) in/out, modulate (cv) in/out, frequency in/out)', // TODO
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'filter1' },
							{ moduleMother: Gain, id: 'gain5' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: QwertyHancock, id: 'qwerty1' },
						]
					},
					{
						modules: [
							{ moduleMother: LFO, id: 'lfo1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches: [
					{ from: 'osc5', to: 'filter1', type: 'audio' },
					{ from: 'filter1', to: 'gain5', type: 'audio' },
					{ from: 'gain5', to: 'masterSection1', type: 'audio' },
					{ from: 'lfo1', to: 'osc5', type: 'modulate' },
					{ from: 'eg1', to: 'gain5', type: 'trigger' },
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' },
					{ from: 'qwerty1', to: 'osc5', type: 'frequency' }
				]
			},
		};
	}
);
