
if (typeof FilterSweepModuleFactory != 'undefined')
	var filterSweepModuleData = {
		controller : GenericController,
		factory : FilterSweepModuleFactory,	
		modules : [
			{ name : 'Wah-Wah', 			shortName : 'lfofilter1'																								}
		]	
	};

	// Custom audio

if (typeof MixerStripModuleFactory != 'undefined')
	var channelStripModuleData = {
		controller : GenericController,
		factory : MixerStripModuleFactory,
		modules : [
			{ name : 'Channel 1',		shortName : 'ch1'																											},
			{ name : 'Channel 2',		shortName : 'ch2'																											},
			{ name : 'Channel 3',		shortName : 'ch3'																											},
			{ name : 'Channel 4',		shortName : 'ch4'																											},
		]
	};

if (typeof SluttrinnModuleFactory != 'undefined')
	var sluttrinnModuleData = {
		controller : GenericController,
		factory : SluttrinnModuleFactory,
		modules : [
			{ name : 'Sluttrinn', 		shortName : 'sluttrinn1'																									}
		]
	};
