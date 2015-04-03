
/*


	Settings and modules for synth keyboard


*/
 
App.prototype.shouldLoadImpulseBuffers = true;
App.prototype.usesSynthAndKeyboard = true;
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
		controller : GenericController,
		factory : VoiceModuleFactory,	
		modules : [
			{ name : 'Voice Bank 1', 	shortName : 'vco1', 																 	w_params : { indexChecked : 0 } },
			{ name : 'Voice Bank 2', 	shortName : 'vco2', 															 		w_params : { indexChecked : 1 } },
		]	
	},
	{
		controller : GenericController,
		factory : FmVoiceModuleFactory,
		modules : [
			{ name : 'FM Voice Bank 1',	shortName : 'fmv1', 																 	w_params : { indexChecked : 0 } },
			{ name : 'FM Voice Bank 2',	shortName : 'fmv2', 															 		w_params : { indexChecked : 1 } },
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
