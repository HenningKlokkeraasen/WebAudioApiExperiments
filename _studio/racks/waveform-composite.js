define([
	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	], function(Oscillator, Gain, MasterSection, ChannelStrip, Analyser) {
		return {
			title : 'Composite waveforms',
			description : 'Mix two or more waveforms. Slightly detune one of two oscillators.',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Oscillator, id: 'osc2' },
							{ moduleMother: Oscillator, id: 'osc3' },
							{ moduleMother: Oscillator, id: 'osc4' },
							{ moduleMother: Gain, id: 'gain4' },
							{ moduleMother: Analyser, id: 'analyser1' },
						]
					},
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: ChannelStrip, id: 'ch4' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches : [
					// Main audio route
					{ from : 'osc1', to : 'ch1', type : 'audio' },
					{ from : 'osc2', to : 'ch2', type : 'audio' },
					{ from : 'osc3', to : 'gain4', type : 'audio' },
					{ from : 'osc4', to : 'ch4', type : 'audio' },
					{ from : 'gain4', to : 'ch3', type : 'audio' },
					{ from : 'ch1', to : 'masterSection1', type : 'audio' },
					{ from : 'ch2', to : 'masterSection1', type : 'audio' },
					{ from : 'ch3', to : 'masterSection1', type : 'audio' },
					{ from : 'ch4', to : 'masterSection1', type : 'audio' },
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			}
		};
	}
);