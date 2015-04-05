define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/CustomGenerators/FmOsc/FmOsc.js',

	'/_studio/Modules/CustomModifiers/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	'/_studio/Modules/CustomModifiers/Tremolo/Tremolo.js',
	], function(AudioDestination, Analyser, Oscillator, FmOsc, SlapbackDelay, SimpleReverb, Tremolo) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Custom nodes',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc1')
							},

							// Custom generators

							{
								controller : FmOsc.Controller,	
								factory : FmOsc.ModuleFactory,	
								modules : FmOsc.Modules
							},
						]
					},
					{
						moduleCollections : [
							// Custom modules
							{  
							   controller : Tremolo.Controller,
							   factory : Tremolo.ModuleFactory,
							   modules : Tremolo.Modules
							},
							{
								controller : SlapbackDelay.Controller,
								factory : SlapbackDelay.ModuleFactory,
								modules : SlapbackDelay.Modules
							},
							{
								controller : SimpleReverb.Controller,
								factory : SimpleReverb.ModuleFactory,
								modules : SimpleReverb.Modules
							},
							// filterSweepModuleData,
						]
					},
					// {
					// 	moduleCollections : [
					// 		channelStripModuleData
					// 	]
					// },
					// {
					// 	moduleCollections : [
					// 		sluttrinnModuleData,
					// 	]
					// },

					{
						moduleCollections : [
							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : AudioDestination.Modules
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
