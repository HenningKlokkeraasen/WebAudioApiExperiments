
/*


	Settings and modules for advanced gen/mod


*/
 
App.prototype.shouldLoadImpulseBuffers = true;

App.prototype.rackData = [
	// Modifiers
	{
		controller : GenericController,
		factory : FilterModuleFactory,
		modules : [
		    { name : 'Filter 1',		shortName : 'filter1',																	t_params : { indexChecked : 0 } 	},
		    { name : 'Filter 2',		shortName : 'filter2',																	t_params : { indexChecked : 1 } 	}
		]	
	},

	// Custom oscillators
	{
		controller : OscillatorController,	
		factory : FmoModuleFactory,	
		modules : [
			{ name : 'FMO 1', 			shortName : 'fmo1', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 1 } 	},
			{ name : 'FMO 2',			shortName : 'fmo2', 		f_params : { min : 20, max : 2000, val :  440, stp :  1 },	w_params : { indexChecked : 2 } 	}
		]	
	},
];

App.prototype.rackData.push(analyserModuleData);
App.prototype.rackData.push(convolverModuleData);
App.prototype.rackData.push(distortionModuleData);
App.prototype.rackData.push(slapbackDelayModuleData);
App.prototype.rackData.push(simpleReverbModuleData);
App.prototype.rackData.push(tremoloModuleData);
App.prototype.rackData.push(vcfModuleData);
App.prototype.rackData.push(channelStripModuleData);
App.prototype.rackData.push(sluttrinnModuleData);
