
/*


	Settings and modules for synth keyboard


*/
 
App.prototype.shouldLoadImpulseBuffers = true;
App.prototype.usesSynthAndKeyboard = true;
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

App.prototype.moduleDatas.push(analyserModuleData);
App.prototype.moduleDatas.push(convolverModuleData);
App.prototype.moduleDatas.push(distortionModuleData);
App.prototype.moduleDatas.push(slapbackDelayModuleData);
App.prototype.moduleDatas.push(simpleReverbModuleData);
App.prototype.moduleDatas.push(tremoloModuleData);
App.prototype.moduleDatas.push(vcfModuleData);
App.prototype.moduleDatas.push(channelStripModuleData);
App.prototype.moduleDatas.push(sluttrinnModuleData);
