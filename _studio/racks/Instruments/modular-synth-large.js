define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js',
	
	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/Fx.js',
	'/_studio/Gear/Mixer.js',
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, LFO, EnvelopeGenerator, QwertyHancock, 
		BasicVoice, Fx, Mixer, FinalStage) {
		return {
			title : 'Modular subtractive synth - with more modulation and effects',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular subtractive synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice
						],
						modules: [
							{ moduleMother: QwertyHancock, id: 'qwerty1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						modules: [
							{ moduleMother: LFO, id: 'lfo1' },
							{ moduleMother: LFO, id: 'lfo2' },
							{ moduleMother: LFO, id: 'lfo3' },
							{ moduleMother: EnvelopeGenerator, id: 'eg2' },
							{ moduleMother: EnvelopeGenerator, id: 'eg3' },
							{ moduleMother: EnvelopeGenerator, id: 'eg4' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
					{
						gear: [
							Mixer,
							Fx,
							FinalStage
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'masterSection1', to : 'gain6', type : 'audio' },
					
					// Trigger / gate
					{ from : 'qwerty1', to : 'eg2', type: 'trigger' },
					{ from : 'qwerty1', to : 'eg3', type: 'trigger' },
					{ from : 'qwerty1', to : 'eg4', type: 'trigger' },
					// { from : 'eg2', to : 'osc1', type: 'trigger' },
					// { from : 'eg3', to : 'resonant1', type: 'trigger' },
					{ from : 'eg4', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'qwerty1', to: 'osc1', type: 'control' },
					
					// Modulation
					{ from: 'lfo1', to: 'osc1', type: 'control' },
					{ from: 'lfo2', to: 'resonant1', type: 'control' },
					{ from: 'lfo3', to: 'gain5', type: 'control' },
					
					{ from: 'gain5', to: 'ch1', type: 'audio'},
					
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
