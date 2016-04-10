define([
	'Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayer',
	'Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayer',
	
	'Modules/BasicWaa/MediaStream/MediaStream',
	
	'Modules/BasicWaa/AudioDestination/AudioDestination',
	
	'Modules/BasicWaa/Analyser/Analyser',

	'Modules/BasicWaa/Oscillator/Oscillator',
	'Modules/BasicWaa/Filter/Filter',
	'Modules/BasicWaa/Gain/Gain',
	'Modules/BasicWaa/Delay/Delay',
	'Modules/BasicWaa/Convolver/Convolver',
	'Modules/BasicWaa/WaveShaper/WaveShaper',
	'Modules/BasicWaa/Compressor/Compressor',
	
	'Modules/Composite/SlapbackDelay/SlapbackDelay',
	'Modules/CustomModifiers/SimpleReverb/SimpleReverb',
	
	'Modules/Composite/ChannelStrip/ChannelStrip',
	'Modules/Composite/MasterSection/MasterSection',

	'Modules/CustomModulators/LFO/Lfo',

	'Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator',
	'Modules/TriggerSources/QwertyHancock/QwertyHancock',
	'Modules/TriggerSources/WebMidiInput/WebMidiInput',

	'Modules/Specialized/HarmonicGenerator/HarmonicGenerator',
	'Modules/Specialized/NoiseGenerator/NoiseGenerator',
	'Modules/Specialized/SuperOsc/SuperOsc',
	
	'Modules/Specialized/WaveTableOsc/WaveTableOsc',

	'Modules/TriggerSources/StepSequencer/StepSequencer'
	], function(AudioFilePlayer, TimedSequencePlayer, MediaStream, AudioDestination, Analyser, 
		Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor,
		SlapbackDelay, SimpleReverb, ChannelStrip, MasterSection,
		LFO, EnvelopeGenerator, QwertyHancock, WebMidiInput,
		HarmonicGenerator, NoiseGenerator, SuperOsc, WaveTableOsc, StepSequencer) {
		return {
			title : 'All the modules',
			description : 'A rack for just loading one of every module available',
			rackData : {
				rows : [
					{
						modules : [
							{ moduleMother: AudioFilePlayer, id: 'drumpads1' },
							{ moduleMother: TimedSequencePlayer, id: 'drumsequences1' },
							{ moduleMother: Analyser, id: 'analyser1' },
						]
					},
					{
						modules: [
							
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Filter, id: 'filter1' },
							{ moduleMother: Gain, id: 'gain0' },
							{ moduleMother: Delay, id: 'delay1' },
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
					{
						modules: [
							{ moduleMother: LFO, id: 'lfo1' },
							{ moduleMother: LFO, id: 'mar1' },
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: MediaStream, id: 'mediastream1' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Compressor, id: 'compressor1' },
							{ moduleMother: AudioDestination, id: 'audiodestination1' }
						]
					},
					{
						modules: [
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' },
							{ moduleMother: QwertyHancock, id: 'qwerty1' },
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
						]
					},
					{
						modules: [
							{ moduleMother: HarmonicGenerator, id: 'harmgen1' },
							{ moduleMother: NoiseGenerator, id: 'noisegen1' },
							{ moduleMother: SuperOsc, id: 'superosc1' },
							{ moduleMother: WaveTableOsc, id: 'wavetable1' },
							{ moduleMother: StepSequencer, id: 'stepseq1' }
						],
					},
				]
			}
		};
	}
);
