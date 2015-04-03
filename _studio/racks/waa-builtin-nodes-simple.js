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
			description : 'This rack shows the basic built-in nodes in the Web Audio API',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : [
									{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	}
								]
							},

					// Sound processors and modifiers

							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : [
								    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	}
								]
							},

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : [
									{ name : 'Gain 1', 			shortName : 'gain1', 	g_params : { min :  0,	max : 1,	val: 0.5,	stp : 0.01 	}										}
								]
							},

							{
								controller : Delay.Controller,
								factory : Delay.ModuleFactory,
								modules : [
								    { name : 'Delay 1',			shortName : 'delay1',	d_params : { min : 0,	max : 1,	val: 0.01,	stp : 0.01 	}										}
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

					// Output and analyse

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
			},
		};
	}
);
