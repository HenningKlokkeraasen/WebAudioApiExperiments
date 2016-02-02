define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	'/_studio/Modules/Composite/Tremolo/Tremolo.js',
	'/_studio/Modules/Composite/WahWah/WahWah.js',
	
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	], function(Analyser, Oscillator, SlapbackDelay, SimpleReverb, Tremolo, WahWah, ChannelStrip, MasterSection) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Composite nodes. Most of these can be achieved by patching simple modules (see modulation rack). '
			+'SlapbackDelay can be achieved by patching gain and delay nodes. Simple Reverb, Channel Strips and Master Section are the exclusive modules here. ',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' }
						]
					},
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: MasterSection, id: 'masterSection1' }
						]
					},
				]
			}
		};
	}
);
