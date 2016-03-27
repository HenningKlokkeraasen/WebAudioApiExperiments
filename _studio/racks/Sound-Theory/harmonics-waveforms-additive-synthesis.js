define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/Specialized/HarmonicGenerator/HarmonicGenerator.js',
	
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, HarmonicGenerator, FinalStage) {
		return {
			title : 'Harmonics / Additive synthesis',
			description : 'Add harmonics to a single sine wave, in various algorithms, results in sawtooth, square and triangle waves',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: HarmonicGenerator, id: 'harmgen1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
					{
						gear: [
							FinalStage
						],
					}
				],
				moduleToGearPatches: [
					{ gear: 'finalStage1', from: 'harmgen1', to: 'gain6', type: 'audio' }
				],
				gearToModulePatches: [
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser1', type: 'audio'},
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser2', type: 'audio'}
				]
			}
		};
	}
);
