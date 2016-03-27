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
							{ moduleMother: Oscillator, id: 'osc1' },
							{ moduleMother: Filter, id: 'resonant1' },
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
					{ from: 'osc1', to: 'resonant1', type: 'audio' },
					{ from: 'resonant1', to: 'gain5', type: 'audio' },
					// { from: 'gain5', to: 'patchbay1', type: 'audio' }
				]
			}
		};
	}
);