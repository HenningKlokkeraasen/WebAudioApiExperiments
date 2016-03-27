define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js',
	
	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, EnvelopeGenerator, WebMidiInput, BasicVoice, FinalStage) {
		return {
			title : 'Modular subtractive synth - basic, with Web MIDI API',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular synthesizer subtractive based on Web Audio API.',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice
						],
						modules : [
							{ moduleMother: Analyser, id: 'analyser1' }
						],
					},
					{
						gear: [
							FinalStage
						],
						modules: [
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'gain5', to : 'gain6', type : 'audio' },
					
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg1', type: 'trigger' },
					{ from : 'eg1', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'osc5', type: 'control' },
					
					// Modulation
					{ from: 'lfo2', to: 'osc5', type: 'control' },
					
					// visual
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
