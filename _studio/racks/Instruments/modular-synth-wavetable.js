define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/Specialized/WaveTableOsc/WaveTableOsc.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js',
	
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, WaveTableOsc, Filter, Gain, EnvelopeGenerator, WebMidiInput, FinalStage) {
		return {
			title : 'Modular wavetable synth, with Web MIDI API',
			description : '',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: WaveTableOsc, id: 'wavetable1' },
							{ moduleMother: Filter, id: 'resonantvcf1' },
							{ moduleMother: Gain, id: 'gain5' },
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
					{ from : 'wavetable1', to : 'resonantvcf1', type : 'audio' },
					{ from : 'resonantvcf1', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'gain6', type : 'audio' },
					
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg1', type: 'trigger' },
					{ from : 'eg1', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'wavetable1', type: 'frequency' },
					
					// Modulation
					{ from: 'lfo2', to: 'wavetable1', type: 'modulate' },
					
					// visual
					{ from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ from: 'compressor1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
