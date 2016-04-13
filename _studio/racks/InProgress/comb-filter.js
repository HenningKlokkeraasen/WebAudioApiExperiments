define([
	'Modules/BasicWaa/Analyser/Analyser',

	'Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator',
	'Modules/TriggerSources/WebMidiInput/WebMidiInput',
	
	'Gear/BasicVoice',
	'Gear/CombFilter',
	'Gear/FinalStage'
	], function(Analyser, EnvelopeGenerator, WebMidiInput, BasicVoice, CombFilter, FinalStage) {
		return {
			title : '...',
			description : '',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice,
							CombFilter
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
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg1', type: 'trigger' },
					{ from : 'eg1', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'osc5', type: 'frequency' },
					
					// Modulation
					{ from: 'lfo2', to: 'osc5', type: 'modulate' },
					
					// visual
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' },

					// Gear-Gear
					{ from: 'gain5', to: 'gain2', type: 'audio'},
					{ from: 'gain2', to: 'gain6', type: 'audio'}
				]
			},
		};
	}
);
