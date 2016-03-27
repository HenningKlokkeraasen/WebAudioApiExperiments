define([
	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	// '/_studio/Modules/AudioBuses/PatchBay/PatchBay.js',
	], function(Oscillator, Filter, Gain
	// , PatchBay
	) {
		return {
			id: 'basicVoice1',
			title : 'Basic Voice Unit',
			description : 'This is a set of three modules that together combine a Voice.',//TODO this is not rendered anywhere
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'resonantvcf1' },
							{ moduleMother: Gain, id: 'gain5' }
						]
					},
					// {
					// 	modules: [
					// 		{ moduleMother: PatchBay, id: 'patchbay1' }
					// 	]
					// }
				],
				patches : [
					{ from: 'osc5', to: 'resonantvcf1', type: 'audio' },
					{ from: 'resonantvcf1', to: 'gain5', type: 'audio' },
					// { from: 'gain5', to: 'patchbay1', type: 'audio' }
				]
			}
		};
	}
);