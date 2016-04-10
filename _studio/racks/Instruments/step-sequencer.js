define([
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencer.js',
	'Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator',
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/FinalStage.js'
	], function(StepSequencer, EnvelopeGenerator, Analyser, 
		BasicVoice, FinalStage) {
		return {
			title : 'Step sequencer',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: StepSequencer, id: 'stepseq1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						gear: [
							BasicVoice,
							FinalStage
						],
						modules: [
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches: [
					{ from: 'stepseq1', to: 'eg1', type: 'trigger' },
					{ from: 'eg1', to: 'gain5', type: 'trigger' },
					{ from: 'stepseq1', to: 'osc5', type: 'frequency' },
					{ from: 'gain5', to: 'gain6', type: 'audio'},

					// visual
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			}
		};
	}
);