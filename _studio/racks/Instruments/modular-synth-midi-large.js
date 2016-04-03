define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	// '/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js',
	
	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/Fx.js',
	'/_studio/Gear/Mixer.js',
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, LFO/*Oscillator*/, EnvelopeGenerator, WebMidiInput,
		BasicVoice, Fx, Mixer, FinalStage) {
		return {
			title : 'Modular subtractive synth - with more modulation and effects, with Web MIDI API',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular subtractive synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice
						],
						modules : [
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						],
					},
					{
						modules: [
							{ moduleMother: LFO/*Oscillator*/, id: 'lfo1' },
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
						],
					}
				],
				patches : [
					// Main audio route
					{ from : 'masterSection1', to : 'gain6', type : 'audio' },
					
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg4', type: 'trigger' },
					{ from : 'eg4', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'osc5', type: 'frequency' },
					
					// Modulation
					{ from: 'lfo1', to: 'osc5', type: 'modulate' },
					
					{ from: 'gain5', to: 'ch1', type: 'audio'},
					
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
