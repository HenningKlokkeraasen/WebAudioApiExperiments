define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js',
	
	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, EnvelopeGenerator, QwertyHancock, BasicVoice, FinalStage) {
		return {
			title : 'Modular subtractive synth - basic',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular subtractive synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice,
							FinalStage
						],
						modules: [
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						modules: [
							{ moduleMother: QwertyHancock, id: 'qwerty1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches : [
					{ from: 'gain5', to: 'gain6', type: 'audio' },
					
					// Trigger / gate
					{ from : 'qwerty1', to : 'eg1', type: 'trigger' },
					{ from : 'eg1', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'qwerty1', to: 'osc1', type: 'control' },
					
					// visual
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			}
		};
	}
);
