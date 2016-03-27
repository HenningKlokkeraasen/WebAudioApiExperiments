define([
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js'
	], function(ChannelStrip, MasterSection) {
		return {
			id: 'mixer1',
			title : 'Mixer',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: ChannelStrip, id: 'ch1' },
							{ moduleMother: ChannelStrip, id: 'ch2' },
							{ moduleMother: ChannelStrip, id: 'ch3' },
							{ moduleMother: ChannelStrip, id: 'ch4' },
							{ moduleMother: MasterSection, id: 'masterSection1' }
						]
					}
				],
				patches : [
					{ from: 'ch1', to: 'masterSection1', type: 'audio' },
					{ from: 'ch2', to: 'masterSection1', type: 'audio' },
					{ from: 'ch3', to: 'masterSection1', type: 'audio' },
					{ from: 'ch4', to: 'masterSection1', type: 'audio' }
				]
			}
		};
	}
);