define([
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',
	'/_studio/Modules/AudioBuses/PatchBay/PatchBay.js',
	], function(ChannelStrip, PatchBay) {
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
							{ moduleMother: ChannelStrip, id: 'ch3' }
						]
					},
					{
						modules: [
							{ moduleMother: PatchBay, id: 'patchbay2' }
						]
					}
				],
				patches : [
					{ from: 'ch1', to: 'patchbay2', type: 'audio' },
					{ from: 'ch2', to: 'patchbay2', type: 'audio' },
					{ from: 'ch3', to: 'patchbay2', type: 'audio' }
				]
			}
		};
	}
);