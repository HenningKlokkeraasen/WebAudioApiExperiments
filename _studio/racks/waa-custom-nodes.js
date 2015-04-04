define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/CustomModifiers/SlapbackDelay/SlapbackDelay.js',
	], function(AudioDestination, Analyser, Oscillator, SlapbackDelay) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Custom nodes',
			rackData : {
				rows : [

					// TEMP

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : [
									{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	}
								]
							},
						]
					},

					// {
					// 	moduleCollections : [
					// 		// Custom oscillators
					// 		{
					// 			controller : OscillatorController,	
					// 			factory : FmoModuleFactory,	
					// 			modules : [
					// 				{ name : 'FM Oscillator 1', 			shortName : 'fmo1', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 1 } 	},
					// 				{ name : 'FM Oscillator 2',			shortName : 'fmo2', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 2 } 	}
					// 			]	
					// 		},
					// 	]
					// },
					{
						moduleCollections : [
							// Custom modules
							//tremoloModuleData,
							{
								controller : SlapbackDelay.Controller,
								factory : SlapbackDelay.ModuleFactory,
								modules : [
									{ name : 'Slapback Delay', shortName : 'slpbkdl1'																										}
								]
							},
							// simpleReverbModuleData,
							// filterSweepModuleData,
						]
					},
					// {
					// 	moduleCollections : [
					// 		// Modifiers
					// 		{
					// 			controller : GenericController,
					// 			factory : FilterModuleFactory,
					// 			modules : [
					// 			    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	},
					// 			    { name : 'Filter 2',		shortName : 'filter2',																	t_params : { indexChecked : 1 } 	}
					// 			]	
					// 		},
					// 	]
					// },
					// {
					// 	moduleCollections : [
					// 		convolverModuleData,
					// 		distortionModuleData
					// 	]
					// },
					// {
					// 	moduleCollections : [
					// 		channelStripModuleData
					// 	]
					// },
					// {
					// 	moduleCollections : [
					// 		sluttrinnModuleData,
					// 		analyserModuleData
					// 	]
					// },

					{
						moduleCollections : [
							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : [
									{ name : 'Speakers',			shortName : 'speakers'																									}
								]
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : [
									{ name : 'Oscilloscope',		shortName : 'oscilloscope'																								}
								]
							}
						]
					}
				]
			}
		};
	}
);
