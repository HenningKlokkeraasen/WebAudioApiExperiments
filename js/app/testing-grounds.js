
/*


	Settings and modules for testing grounds


*/
 
App.prototype.shouldLoadImpulseBuffers = false;

App.prototype.rackData = [
	// Oscillators
	{
		controller : OscillatorController,
		factory : OscillatorModuleFactory,
		modules : [
			{ name : 'Osc 1', 			shortName : 'osc1', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
			{ name : 'Osc 2', 			shortName : 'osc2', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
			{ name : 'Osc 3', 			shortName : 'osc3', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	},
			{ name : 'Osc 4', 			shortName : 'osc4', 	f_params : { min : 20, 	max : 2000, val :  440, stp :  1 	}, 	w_params : { indexChecked : 0 } 	}
		]
	},

	// Custom modules
	{
		controller : OscillatorController,
		factory : HarmonicGeneratorModuleFactory,
		modules : [
			{ name : 'Harmonic Generator',	shortName : 'harmgen1', f_params : { min : 20, 	max : 2000, val :  440, stp :  10 	}, 	w_params : { indexChecked : 0 } 	},
		]
	},
	{
		controller : OscillatorController,
		factory : WaveTableOscModuleFactory,
		modules : [
			{ name : 'Wave Table Osc',	shortName : 'wto1', f_params : { min : 20, 	max : 2000, val :  440, stp :  10 	}, 	w_params : { indexChecked : 0 } 	},
		]
	},
];

App.prototype.rackData.push(analyserModuleData);
App.prototype.rackData.push(sluttrinnModuleData);
