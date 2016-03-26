define([
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
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js'
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor, 
		SlapbackDelay, ChannelStrip, MasterSection,
		SimpleReverb) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in (vanilla) sound generation and modification nodes in the Web Audio API - with more modules for more sound and patch possibilities.'
				
				+`
				Things to try;
				<ul>
				<li>Combine two different waveforms (e.g. triangle and sawtooth combined is used on the Minimoog)
				<li>Invert a waveform (an inverted ramp up saw is a ramp down saw)
				<li>Dual waveforms where one is inverted (dual saws gives a chorusing effect)
				<li>Combine two equal waveforms but one slightly detuned (dual squares slightly detuned gives a chorusing effect)
				</ul>
				Use the All Pass Filters to shift the phase of an oscillator if the cycles are different.
				`,
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Oscillator, id: 'osc2' },
							{ moduleMother: Oscillator, id: 'osc3' },
							{ moduleMother: Gain, id: 'gain4' },
							{ moduleMother: Gain, id: 'gain1' },
							{ moduleMother: Gain, id: 'gain2' },
							{ moduleMother: Gain, id: 'gain3' },
						]
					},
					{
						modules: [
							{ moduleMother: Filter, id: 'allpass1' },
							{ moduleMother: Filter, id: 'allpass2' },
							{ moduleMother: Filter, id: 'allpass3' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Delay, id: 'delay1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						modules: [
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' },
							{ moduleMother: Delay, id: 'delay2' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: ChannelStrip, id: 'ch4' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
						]
					},
				],
				patches : [
					// Voice 1
					{
						from : 'osc1',
						to : 'allpass1',
						type : 'audio'
					},
					{
						from : 'allpass1',
						to : 'ch1',
						type : 'audio'
					},
					// Voice 2
					{
						from : 'osc2',
						to : 'allpass2',
						type : 'audio'
					},
					{
						from : 'allpass2',
						to : 'ch2',
						type : 'audio'
					},
					// Voice 3
					{
						from : 'osc3',
						to : 'gain4',
						type : 'audio'
					},
					{
						from : 'gain4',
						to : 'allpass3',
						type : 'audio'
					},
					{
						from : 'allpass3',
						to : 'ch3',
						type : 'audio'
					},
					// Mixer
					{
						from : 'ch1',
						to : 'masterSection1',
						type : 'audio'
					},
					{
						from : 'ch2',
						to : 'masterSection1',
						type : 'audio'
					},
					{
						from : 'ch3',
						to : 'masterSection1',
						type : 'audio'
					},
					{
						from : 'ch4',
						to : 'masterSection1',
						type : 'audio'
					},
					// Visualization
					{
						from : 'masterSection1',
						to : 'analyser1',
						type : 'audio'
					},
					{
						from : 'masterSection1',
						to : 'analyser2',
						type : 'audio'
					},
				]
			}
		};
	}
);