define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',

	'/_studio/Modules/CustomGenerators/HarmonicGenerator/HarmonicGenerator.js'
	], function(Analyser, MasterSection, HarmonicGenerator) {
		return {
			title : 'Harmonics / Additive synthesis',
			description : 'Add harmonics to a single sine wave, in various algorithms, results in sawtooth, square and triangle waves',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [

							// Custom generators

							{
								controller : HarmonicGenerator.Controller,
								factory : HarmonicGenerator.ModuleFactory,
								modules : HarmonicGenerator.Modules
							}
						]
					},

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
