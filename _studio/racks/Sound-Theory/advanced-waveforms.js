define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGenerator.js',
	'/_studio/Modules/Specialized/PulseWave/PulseWave.js',
	'/_studio/Modules/Specialized/SuperSaw/SuperSaw.js',
	], function(Analyser, MasterSection, ChannelStrip, NoiseGenerator, PulseWave, SuperSaw) {
		return {
			title : 'Advanced wave forms',
			description : 'Lorem ipsum',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: NoiseGenerator, id: 'noisegen1' },
							{ moduleMother: PulseWave, id: 'pulsewave1' },
							{ moduleMother: SuperSaw, id: 'supersaw1' },
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches: [ 
					{ from: 'noisegen1', to: 'ch1', type: 'audio' },
					{ from: 'pulsewave1', to: 'ch2', type: 'audio' },
					{ from: 'supersaw1', to: 'ch3', type: 'audio' },
					{ from: 'ch1', to: 'masterSection1', type: 'audio' },
					{ from: 'ch2', to: 'masterSection1', type: 'audio' },
					{ from: 'ch3', to: 'masterSection1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' },
				]
			}
		};
	}
);
