define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomGenerators/LFO/Lfo.js',
	'/_studio/Modules/CustomTriggers/EnvelopeGenerator/EnvelopeGenerator.js'
	], function(Analyser, MasterSection, MediaStream, Oscillator, Gain, LFO, EnvelopeGenerator) {
		return {
			title : 'Sound modulation and triggers (gates)',
			description : 'This rack shows modulation and trigger nodes',
			rackData : {
				rows : [

					{
						moduleCollections : [

							// Media Stream

							{
								controller : MediaStream.Controller,
								factory : MediaStream.ModuleFactory,
								modules : MediaStream.Modules
							},

							// Sound generators

							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc1')
							},

							// Sound processors and modifiers

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain0')
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
							},

							// Modulators

							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules
							},

							// Triggers

							{
								controller : EnvelopeGenerator.Controller,
								factory : EnvelopeGenerator.ModuleFactory,
								modules : EnvelopeGenerator.Modules
							}
						]
					}
				]
			},
		};
	}
);
