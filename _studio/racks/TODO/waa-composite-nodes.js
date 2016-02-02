define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	'/_studio/Modules/Composite/Tremolo/Tremolo.js',
	'/_studio/Modules/Composite/WahWah/WahWah.js',
	
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	], function(Analyser, Oscillator, SlapbackDelay, SimpleReverb, Tremolo, WahWah, ChannelStrip, MasterSection) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Composite nodes. Most of these can be achieved by patching simple modules (see modulation rack). SlapbackDelay can be achieved by patching gain and delay nodes. Simple Reverb, Channel Strips and Master Section are the exclusive modules here. ',
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

						]
					},

					// Modifiers

					{
						moduleCollections : [

							// Custom modifiers

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

					// Mixer

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
