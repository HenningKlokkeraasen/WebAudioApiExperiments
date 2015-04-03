// // Analyser
// if (typeof AnalyserModuleFactory != 'undefined')
// 	var analyserModuleData = {
// 		controller : AnalyserController,
// 		factory : AnalyserModuleFactory,
// 		modules : [
// 			{ name : 'Oscilloscope',		shortName : 'oscilloscope'																								}
// 		]
// 	};

	// Modifiers

// if (typeof ConvolverModuleFactory != 'undefined')
// 	var convolverModuleData = {
// 		controller : GenericController,
// 		factory : ConvolverModuleFactory,
// 		modules : [
// 			{ name : 'Convolver 1',		shortName : 'convolver1',	/*impulseOptions : this.getImpulseOptions()*/ 														}
// 		]
// 	};

// if (typeof WaveShaperModuleFactory != 'undefined')
// 	var distortionModuleData = {
// 		controller : GenericController,
// 		factory : WaveShaperModuleFactory,
// 		modules : [
// 			{ name: 'Distortion (Wave Shaper)', 		shortName : 'dist1'																							}
// 		]
// 	};

	// Custom modifiers

if (typeof SlapbackDelayModuleFactory != 'undefined')
	var slapbackDelayModuleData = {
		controller : GenericController,
		factory : SlapbackDelayModuleFactory,
		modules : [
			{ name : 'Slapback Delay', shortName : 'slpbkdl1'																										}
		]
	};

if (typeof SimpleReverbModuleFactory != 'undefined')
	var simpleReverbModuleData = {
		controller : GenericController,
		factory : SimpleReverbModuleFactory,
		modules : [
			{ name : 'Simple Reverb',	shortName : 'smplrev1'																									}
		]
	};

if (typeof TremoloModuleFactory != 'undefined')
	var tremoloModuleData = {
		controller : GenericController,
		factory : TremoloModuleFactory,
		modules : [
			{ name : 'Tremolo',			shortName : 'tremolo1',														 			w_params : { indexChecked : 0 } 	},
		]
	};

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
