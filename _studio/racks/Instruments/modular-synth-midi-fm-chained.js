define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, Convolver, WaveShaper, SlapbackDelay, SimpleReverb, ChannelStrip, LFO, EnvelopeGenerator, WebMidiInput) {
		return {
			title : 'Modular FM synth - with three operators',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular FM synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'filter5' },
							{ moduleMother: Gain, id: 'gain5' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						],
					},
					{
						modules: [
							{ moduleMother: LFO, id: 'mar1' },
							{ moduleMother: LFO, id: 'mar2' },
							{ moduleMother: EnvelopeGenerator, id: 'eg2' },
							{ moduleMother: EnvelopeGenerator, id: 'eg3' },
							{ moduleMother: EnvelopeGenerator, id: 'eg4' },
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' }
						]
					},
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: ChannelStrip, id: 'ch4' },
							{ moduleMother: MasterSection, id: 'masterSection1' }
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'filter5', type : 'audio' },
					{ from : 'filter5', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'ch1', type : 'audio' },
					{ from : 'ch1', to : 'masterSection1', type : 'audio' },
					
					// Trigger / gate
					{ from : 'webmidi1', to : 'eg4', type: 'trigger' },
					{ from : 'eg4', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'webmidi1', to: 'osc5', type: 'control' },
					
					// Modulation
					{ from: 'mar1', to: 'mar2', type: 'control' },
					{ from: 'mar2', to: 'osc5', type: 'control' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
