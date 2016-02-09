define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/Specialized/WaveTableOsc/WaveTableOsc.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js'
	], function(Analyser, MasterSection, WaveTableOsc, Filter, Gain, EnvelopeGenerator, WebMidiInput) {
		return {
			title : 'Modular wavetable synth, with Web MIDI API',
			description : '',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						],
					},
					{
						modules: [
							{ moduleMother: WaveTableOsc, id: 'wavetable1' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Gain, id: 'gain5' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'wavetable1', to : 'resonant1', type : 'audio' },
					{ from : 'resonant1', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'masterSection1', type : 'audio' },
					
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg1', type: 'trigger' },
					{ from : 'eg1', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'wavetable1', type: 'control' },
					
					// Modulation
					{ from: 'lfo2', to: 'wavetable1', type: 'control' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
