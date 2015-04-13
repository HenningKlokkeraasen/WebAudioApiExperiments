define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js'
	], function(Analyser, MasterSection, Oscillator, Gain, EnvelopeGenerator, QwertyHancock) {
		return {
			title : 'qwerty hancock',
			description : '',
			rackData : {
				rows : [
					{
						moduleCollections : [

							// Triggers

							{
								controller : QwertyHancock.Controller,
								factory : QwertyHancock.ModuleFactory,
								modules : QwertyHancock.Modules
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

							// Sound generators

							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc5')
							},

							// Sound processors and modifiers

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain5')
							},
							
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
						]
					}
				]
			},
		};
	}
);
