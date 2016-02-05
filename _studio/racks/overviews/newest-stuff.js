define([
	'/_studio/Modules/AudioBuses/PatchBay/PatchBay.js',
	'/_studio/Modules/NonAudio/BlankPanel/BlankPanel.js',
	'/_studio/Modules/NonAudio/LedTest/LedTest.js',
	], function(PatchBay, BlankPanel, LedTest) {
		return {
			title : 'Newest stuff',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: PatchBay, id: 'patchbay1' },
							{ moduleMother: BlankPanel, id: 'blankPanel1' },
							{ moduleMother: LedTest, id: 'ledTest1' },
						]
					},
				]
			}
		};
	}
);