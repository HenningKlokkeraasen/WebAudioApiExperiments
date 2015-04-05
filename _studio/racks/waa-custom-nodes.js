define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/CustomGenerators/FmOsc/FmOsc.js',

	'/_studio/Modules/CustomModifiers/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	'/_studio/Modules/CustomModifiers/Tremolo/Tremolo.js',
	'/_studio/Modules/CustomModifiers/WahWah/WahWah.js',
	
	'/_studio/Modules/CustomMixerModules/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/CustomMixerModules/MasterSection/MasterSection.js',
	], function(Analyser, Oscillator, FmOsc, SlapbackDelay, SimpleReverb, Tremolo, WahWah, ChannelStrip, MasterSection) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Custom nodes',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc1')
							},

							// Custom generators

							{
								controller : FmOsc.Controller,	
								factory : FmOsc.ModuleFactory,	
								modules : FmOsc.Modules
							},
						]
					},

					// Custom modifiers

					{
						moduleCollections : [
							{
								controller : SimpleReverb.Controller,
								factory : SimpleReverb.ModuleFactory,
								modules : SimpleReverb.Modules
							},
							{
								controller : SlapbackDelay.Controller,
								factory : SlapbackDelay.ModuleFactory,
								modules : SlapbackDelay.Modules
							},
							{  
							   controller : Tremolo.Controller,
							   factory : Tremolo.ModuleFactory,
							   modules : Tremolo.Modules
							},
							{
								controller : WahWah.Controller,
								factory : WahWah.ModuleFactory,	
								modules : WahWah.Modules
							}
						]
					},

					// Custom Mixer

					{
						moduleCollections : [
							{
								controller : ChannelStrip.Controller,
								factory : ChannelStrip.ModuleFactory,
								modules : ChannelStrip.Modules
							}
						]
					},

					{
						moduleCollections : [
							{
								controller : MasterSection.Controller,
								factory : MasterSection.ModuleFactory,
								modules : MasterSection.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					}
				]
			}
		};
	}
);
