define([
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	], function(Convolver, WaveShaper, SlapbackDelay, SimpleReverb) {
		return {
			id: 'fx1',
			title : 'FX',
			description : 'This is an effets unit',//TODO this is not rendered anywhere
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: WaveShaper, id: 'wsdist1' },
							{ moduleMother: SimpleReverb, id: 'smplrev1' },
							{ moduleMother: SlapbackDelay, id: 'slpbkdl1' },
						]
					},
				],
				patches : [
				]
			}
		};
	}
);