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
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, Convolver, WaveShaper, SlapbackDelay, SimpleReverb, ChannelStrip, LFO, EnvelopeGenerator, QwertyHancock) {
		return {
			title : 'Modular subtractive synth - with more modulation and effects',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular subtractive synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: QwertyHancock, id: 'qwerty1' },
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Gain, id: 'gain5' },
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
						modules: [
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' },
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: MasterSection, id: 'masterSection1' }
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'resonant1', type : 'audio' },
					{ from : 'resonant1', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'ch1', type : 'audio' },
					{ from : 'ch1', to : 'masterSection1', type : 'audio' },
					
					// Trigger / gate
					{ from : 'qwerty1', to : 'eg2', type: 'trigger' },
					{ from : 'qwerty1', to : 'eg3', type: 'trigger' },
					{ from : 'qwerty1', to : 'eg4', type: 'trigger' },
					{ from : 'eg2', to : 'osc5', type: 'trigger' },
					{ from : 'eg3', to : 'resonant1', type: 'trigger' },
					{ from : 'eg4', to : 'gain5', type: 'trigger' },
					
					// Pitch / control / noteOn, noteOff
					{ from: 'qwerty1', to: 'osc5', type: 'control' },
					
					// Modulation
					{ from: 'lfo1', to: 'osc5', type: 'control' },
					{ from: 'lfo2', to: 'resonant1', type: 'control' },
					{ from: 'lfo3', to: 'gain5', type: 'control' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
