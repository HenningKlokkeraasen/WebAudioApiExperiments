define([
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencer.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/FinalStage.js'
	], function(StepSequencer,Analyser, 
		BasicVoice, FinalStage) {
		return {
			title : 'Step sequencer',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: StepSequencer, id: 'stepseq1' },
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
					{ from: 'stepseq1', to: 'gain5', type: 'trigger' },
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