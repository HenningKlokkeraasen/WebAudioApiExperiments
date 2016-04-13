define([
	'Modules/BasicWaa/Filter/Filter',
	'Modules/BasicWaa/Delay/Delay',
	'Modules/BasicWaa/Gain/Gain'
	], function(Filter, Delay, Gain) {
		return {
			id: 'combfilter1',
			title : 'Comb Filter',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Delay, id: 'delay1' },
							{ moduleMother: Gain, id: 'gain2' }
						]
					}
				],
				patches : [
					{ from: 'resonant1', to: 'delay1', type: 'audio' },
					{ from: 'delay1', to: 'gain2', type: 'audio' },
					{ from: 'gain2', to: 'resonant1', type: 'audio' }
				]
			}
		};
	}
);