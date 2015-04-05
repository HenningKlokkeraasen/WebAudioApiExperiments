define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',
	'/_studio/Modules/CustomGenerators/NoiseGenerator/NoiseGenerator.js',
	'/_studio/Modules/CustomGenerators/PulseWave/PulseWave.js',
	'/_studio/Modules/CustomGenerators/SuperSaw/SuperSaw.js',
	], function(Analyser, MasterSection, NoiseGenerator, PulseWave, SuperSaw) {
		return {
			title : 'Advanced wave forms',
			description : 'Lorem ipsum',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [

							// Custom modules
							{
								controller : NoiseGenerator.Controller,
								factory : NoiseGenerator.ModuleFactory,
								modules : NoiseGenerator.Modules
							},
							{
								controller : PulseWave.Controller,
								factory : PulseWave.ModuleFactory,
								modules : PulseWave.Modules
							},
							{
								controller : SuperSaw.Controller,
								factory : SuperSaw.ModuleFactory,
								modules : SuperSaw.Modules
							},
						]
					},

					// Mixer

					{
						moduleCollections : [
							{
								controller : MasterSection.Controller,
								factory : MasterSection.ModuleFactory,
								modules : MasterSection.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					}
				]
			}
		};
	}
);
