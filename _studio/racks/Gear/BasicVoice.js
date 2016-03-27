define([
	'/_studio/gear/BasicVoice.js',
	'/_studio/Gear/Fx.js',
	'/_studio/gear/Mixer.js',
	'/_studio/gear/FinalStage.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js'
	], function(BasicVoice, Fx, Mixer, FinalStage, Analyser) {
		return {
			title : 'Gear!',
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
						gear: [
							Fx,
							FinalStage
						],
					},
				],
				gearToModulePatches: [
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser2', type: 'audio' }
				],
				gearToGearPatches: [
					{ fromGear: 'basicVoice1', toGear: 'mixer1', from: 'gain5', to: 'ch1', type: 'audio' },
					{ fromGear: 'mixer1', toGear: 'finalStage1', from: 'masterSection1', to: 'gain6', type: 'audio' }
				]
			}
		};
	}
);