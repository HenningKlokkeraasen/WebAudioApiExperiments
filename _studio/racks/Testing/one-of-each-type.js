define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	'/_studio/Modules/CustomTriggers/EnvelopeGenerator/EnvelopeGenerator.js'
	], function(Analyser, MasterSection, MediaStream, Oscillator, Gain, LFO, EnvelopeGenerator) {
		return {
			title : 'One of each type',
			description : '...of connection combination (audio in/out, trigger (gate) in/out, control (cv) in/out)',
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
								modules : LFO.Modules.getItemsByShortName('lfo1')
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
