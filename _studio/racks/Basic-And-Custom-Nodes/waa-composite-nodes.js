define([

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	], function(SlapbackDelay, ChannelStrip, MasterSection) {
		return {
			title : 'Sound Generation and Modification',
			description : 'Composite modules. Consists of 2 or more WAAPI nodes.'
			+'Most of these can be achieved by patching simple modules (see modulation rack). '
			,
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' },
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: MasterSection, id: 'masterSection1' }
						]
					},
				]
			}
		};
	}
);
