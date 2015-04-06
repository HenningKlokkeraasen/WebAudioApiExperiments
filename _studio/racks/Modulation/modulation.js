define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',

	'/_studio/Modules/CustomGenerators/LFO/Lfo.js'
	], function(Analyser, MasterSection, LFO) {
		return {
			title : 'Sound modulation',
			description : 'This rack shows modulation',
			rackData : {
				rows : [
					// Sound generators

					{
						moduleCollections : [
							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules
							},
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
			},
		};
	}
);
