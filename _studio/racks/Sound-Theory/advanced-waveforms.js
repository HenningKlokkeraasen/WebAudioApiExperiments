define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGenerator.js',
	'/_studio/Modules/Specialized/PulseWave/PulseWave.js',
	'/_studio/Modules/Specialized/SuperSaw/SuperSaw.js',
	
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, NoiseGenerator, PulseWave, SuperSaw, FinalStage) {
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
						gear: [
							FinalStage
						],
						modules: [
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				moduleToGearPatches: [
					{ gear: 'finalStage1', from: 'noisegen1', to: 'gain6', type: 'audio' },
					{ gear: 'finalStage1', from: 'pulsewave1', to: 'gain6', type: 'audio' },
					{ gear: 'finalStage1', from: 'supersaw1', to: 'gain6', type: 'audio' },
				],
				gearToModulePatches: [
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser2', type: 'audio' }
				],
			}
		};
	}
);
