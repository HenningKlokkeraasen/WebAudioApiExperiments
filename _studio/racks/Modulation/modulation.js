define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	'/_studio/Modules/CustomModulators/ModulatorAudibleRange/ModulatorAudibleRange.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, EnvelopeGenerator, LFO, ModulatorAudibleRange) {
		return {
			title : 'Sound modulation and triggers (gates)',
			description : 'This rack shows modulation and trigger nodes (LFO and Envelope Generator).'
				+'<br/>1. Connect the trigger out of an EG to the trigger in of an Amp (gain node) to get a basic ADSR envelope.'
				+'<br/>5. Connect the control out of an Osc (Modulator in audible range) to the control in of another Osc to get FM synthesis'
				+'<br/>6. Connect the control out of an Osc (Modulator in audible range) to the control in of an Amp to get ring modulation'
				// +'<br/>6. Chain several LFOs / '
				,
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc5')
							},

					// Sound processors and modifiers

							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : Filter.Modules.getItemsByShortName('filter5')
							},

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain5')
							},

					// Mixer

							
							{
								controller : MasterSection.Controller,
								factory : MasterSection.ModuleFactory,
								modules : MasterSection.Modules
							},
						]
					},


					{
						moduleCollections : [
							{
								controller : EnvelopeGenerator.Controller,
								factory : EnvelopeGenerator.ModuleFactory,
								modules : EnvelopeGenerator.Modules.getItemsByShortName('eg1')
							},

							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules.getItemsByShortName('lfo1')
							},

							{
								controller : ModulatorAudibleRange.Controller,
								factory : ModulatorAudibleRange.ModuleFactory,
								modules : ModulatorAudibleRange.Modules.getItemsByShortName('mar1')
							},

							// Analyser
							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					},

					// NOTE: major perf issues with many lfo/mar modules at the same time
					// {
					// 	moduleCollections : [

					// 		{
					// 			controller : LFO.Controller,
					// 			factory : LFO.ModuleFactory,
					// 			modules : LFO.Modules.getItemsByShortName('lfo2', 'lfo3')
					// 		},

					// 		{
					// 			controller : ModulatorAudibleRange.Controller,
					// 			factory : ModulatorAudibleRange.ModuleFactory,
					// 			modules : ModulatorAudibleRange.Modules.getItemsByShortName('mar2', 'mar3')
					// 		},

					// 	]
					// },

					{
						moduleCollections : [

						]
					}
				]
			},
		};
	}
);
