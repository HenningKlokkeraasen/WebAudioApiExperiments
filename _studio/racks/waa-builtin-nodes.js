define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in nodes in the Web Audio API - with more modules',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : [
									{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
									{ name : 'Osc 2', 			shortName : 'osc2', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 1 } 	},
									{ name : 'Osc 3', 			shortName : 'osc3', 	f_params : { min : 2000,max : 10000,val : 3000, stp : 10 	}, 	w_params : { indexChecked : 2 } 	},
									{ name : 'Osc 4', 			shortName : 'osc4', 	f_params : { min :10000,max : 20000,val :11000, stp : 10 	}, 	w_params : { indexChecked : 3 } 	}
								]
							},
						]
					},

					// Sound processors and modifiers

					{
						moduleCollections : [
							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : [
								    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	},
								    { name : 'Filter 2',		shortName : 'filter2',																	t_params : { indexChecked : 1 } 	},
								    { name : 'Filter 3',		shortName : 'filter3',																	t_params : { indexChecked : 2 } 	},
								    { name : 'Filter 4',		shortName : 'filter4',																	t_params : { indexChecked : 3 } 	}
								]
							},
						]
					},

					{
						moduleCollections : [
							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : [
									{ name : 'Gain 1: Amplify', 		shortName : 'gain1', 	g_params : { min :  1,	max : 6,	val:  1,	stp : 0.01 	} 										},
									{ name : 'Gain 2: Reduce', 			shortName : 'gain2', 	g_params : { min :  0,	max : 1,	val: 0.5,	stp : 0.01 	}										},
									{ name : 'Gain 3: Mute or Pass-through', shortName : 'gain3', 	g_params : { min :  0,	max : 1,val:  0,	stp : 1 	}										},
									{ name : 'Gain 4: Invert', 			shortName : 'gain5', 	g_params : { min : -2,	max : 0,	val: -1,	stp : 0.01 	}										}
								]
							},
						]
					},

					{
						moduleCollections : [
							{
								controller : Delay.Controller,
								factory : Delay.ModuleFactory,
								modules : [
								    { name : 'Delay 1',			shortName : 'delay1',	d_params : { min : 0,	max : 1,	val: 0.01,	stp : 0.01 	}										},
								    { name : 'Delay 2',			shortName : 'delay2',	d_params : { min : 0,	max : 1,	val: 0.15,	stp : 0.01 	}										},
								    { name : 'Delay 3',			shortName : 'delay3',	d_params : { min : 0,	max : 2,	val: 0.5,	stp : 0.1 	}										},
								    { name : 'Delay 4',			shortName : 'delay4',	d_params : { min : 0,	max : 3,	val:  1,	stp : 0.1 	}										}
								]
							},
						]
					},

					{
						moduleCollections : [
							{
								controller : Convolver.Controller,
								factory : Convolver.ModuleFactory,
								modules : [
									{ name : 'Convolver 1',		shortName : 'convolver1',	impulseFilePaths : [
										'/audiofiles/impulses/FactoryHall/FactoryHall/FactoryHall.wav',
										'/audiofiles/impulses/FactoryHall/PaHornInHall/PaHornInHall.wav',
										'/audiofiles/impulses/ChurchSchellingwoude/ChurchSchellingwoude/Church.wav',
										'/audiofiles/impulses/ClaustrofobiaV1.1/Ironbath/Bath.wav',
										'/audiofiles/impulses/Speakersandtelephones/Smallportable/SmallPortable.wav'
										]
									}
								]
							},
							{
								controller : WaveShaper.Controller,
								factory : WaveShaper.ModuleFactory,
								modules : [
									{ name: 'Distortion (Wave Shaper)', 		shortName : 'dist1'																							}
								]
							}
						]
					},

					{
						moduleCollections : [
							{
								controller : Compressor.Controller,
								factory : Compressor.ModuleFactory,
								modules : [
									{ name : 'Compressor 1',	shortName : 'compressor1'											 														}
								]
							},
						]
					},

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
					},
				]
			}
		};
	}
);