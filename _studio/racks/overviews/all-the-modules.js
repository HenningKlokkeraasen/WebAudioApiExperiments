define([
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayer.js',
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayer.js',
	
	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js',
	
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	
	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js',

	'/_studio/Modules/Specialized/HarmonicGenerator/HarmonicGenerator.js',
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGenerator.js',
	'/_studio/Modules/Specialized/PulseWave/PulseWave.js',
	'/_studio/Modules/Specialized/SuperSaw/SuperSaw.js'
	], function(AudioFilePlayer, TimedSequencePlayer, MediaStream, AudioDestination, Analyser, 
		Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor,
		SlapbackDelay, SimpleReverb, ChannelStrip, MasterSection,
		LFO, EnvelopeGenerator, QwertyHancock, WebMidiInput,
		HarmonicGenerator, NoiseGenerator, PulseWave, SuperSaw) {
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
							{ moduleMother: PulseWave, id: 'pulsewave1' },
							{ moduleMother: SuperSaw, id: 'supersaw1' },
						],
					},
				]
			}
		};
	}
);
