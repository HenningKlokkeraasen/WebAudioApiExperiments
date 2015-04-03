
/*


	Settings and modules for basic gen/mod


*/
 
App.prototype.shouldLoadImpulseBuffers = true;

App.prototype.rackData = [
	// Audio Destination
	{
		controller : GenericController,
		factory : AudioDestinationModuleFactory,
		modules : [
			{ name : 'Speakers',			shortName : 'speakers'																									}
		]
	},

	// Oscillators
	{
		controller : OscillatorController,
		factory : OscillatorModuleFactory,
		modules : [
			{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
			{ name : 'Osc 2', 			shortName : 'osc2', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 1 } 	},
			{ name : 'Osc 3', 			shortName : 'osc3', 	f_params : { min : 2000,max : 10000,val : 3000, stp : 10 	}, 	w_params : { indexChecked : 2 } 	},
			{ name : 'Osc 4', 			shortName : 'osc4', 	f_params : { min :10000,max : 20000,val :11000, stp : 10 	}, 	w_params : { indexChecked : 3 } 	}
		]
	},

	// Modifiers
	{
		controller : GenericController,
		factory : GainModuleFactory,
		modules : [
			{ name : 'Gain 1: Amplify', 		shortName : 'gain1', 	g_params : { min :  1,	max : 6,	val:  1,	stp : 0.01 	} 										},
			{ name : 'Gain 2: Reduce', 			shortName : 'gain2', 	g_params : { min :  0,	max : 1,	val: 0.5,	stp : 0.01 	}										},
			{ name : 'Gain 3: Mute or Pass-through', shortName : 'gain3', 	g_params : { min :  0,	max : 1,val:  0,	stp : 1 	}										},
			{ name : 'Gain 4: Invert', 			shortName : 'gain5', 	g_params : { min : -2,	max : 0,	val: -1,	stp : 0.01 	}										}
		]
	},
	{
		controller : GenericController,
		factory : DelayModuleFactory,
		modules : [
		    { name : 'Delay 1',			shortName : 'delay1',	d_params : { min : 0,	max : 1,	val: 0.01,	stp : 0.01 	}										},
		    { name : 'Delay 2',			shortName : 'delay2',	d_params : { min : 0,	max : 1,	val: 0.15,	stp : 0.01 	}										},
		    { name : 'Delay 3',			shortName : 'delay3',	d_params : { min : 0,	max : 2,	val: 0.5,	stp : 0.1 	}										},
		    { name : 'Delay 4',			shortName : 'delay4',	d_params : { min : 0,	max : 3,	val:  1,	stp : 0.1 	}										}
		]
	},
	{
		controller : GenericController,
		factory : FilterModuleFactory,
		modules : [
		    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	},
		    { name : 'Filter 2',		shortName : 'filter2',																	t_params : { indexChecked : 1 } 	},
		    { name : 'Filter 3',		shortName : 'filter3',																	t_params : { indexChecked : 2 } 	},
		    { name : 'Filter 4',		shortName : 'filter4',																	t_params : { indexChecked : 3 } 	}
		]
	},
	{
		controller : GenericController,
		factory : CompressorModuleFactory,
		modules : [
			{ name : 'Compressor 1',	shortName : 'compressor1'											 														}
		]
	},
];

App.prototype.rackData.push(analyserModuleData);
App.prototype.rackData.push(convolverModuleData);
App.prototype.rackData.push(distortionModuleData);

