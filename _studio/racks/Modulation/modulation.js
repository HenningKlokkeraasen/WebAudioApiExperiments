define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',

	'/_studio/Modules/CustomGenerators/LFO/Lfo.js',
	'/_studio/Modules/CustomTriggers/EnvelopeGenerator/EnvelopeGenerator.js'
	], function(Analyser, MasterSection, LFO, EnvelopeGenerator) {
		return {
			title : 'Sound modulation and triggers (gates)',
			description : 'This rack shows modulation and trigger nodes',
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

							{
								controller : EnvelopeGenerator.Controller,
								factory : EnvelopeGenerator.ModuleFactory,
								modules : EnvelopeGenerator.Modules
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
			},
		};
	}
);
