define([
	'/_studio/gear/BasicVoice.js',
	'/_studio/gear/Mixer.js',
	
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js'
	], function(BasicVoice, Mixer, AudioDestination, Analyser) {
		return {
			title : 'Gears!',
			description : 'This rack is the first to have Gear. A piece of Gear is something that has some predefined modules and internal patching, like a Voice, Mixer, Equalizer, Effects Unit, etc.',
			rackData : {
				rows : [
					{
						gear: [
							BasicVoice,
							Mixer
						]
					},
					{
						modules: [
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
				],
				gearToModulePatches: [
					{ gear: 'mixer1', from: 'patchbay2', to: 'audiodestination1', type: 'audio' },
					{ gear: 'mixer1', from: 'patchbay2', to: 'analyser1', type: 'audio' },
					{ gear: 'mixer1', from: 'patchbay2', to: 'analyser2', type: 'audio' }
				],
				gearToGearPatches: [
					{ fromGear: 'basicVoice1', toGear: 'mixer1', from: 'patchbay1', to: 'ch1', type: 'audio' }
				]
			}
		};
	}
);