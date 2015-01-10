
/*


	Settings and modules for advanced gen/mod


*/
 
App.prototype.shouldLoadImpulseBuffers = true;

App.prototype.moduleDatas = [
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

App.prototype.moduleDatas.push(analyserModuleData);
App.prototype.moduleDatas.push(convolverModuleData);
App.prototype.moduleDatas.push(distortionModuleData);
App.prototype.moduleDatas.push(slapbackDelayModuleData);
App.prototype.moduleDatas.push(simpleReverbModuleData);
App.prototype.moduleDatas.push(tremoloModuleData);
App.prototype.moduleDatas.push(vcfModuleData);
App.prototype.moduleDatas.push(channelStripModuleData);
App.prototype.moduleDatas.push(sluttrinnModuleData);
