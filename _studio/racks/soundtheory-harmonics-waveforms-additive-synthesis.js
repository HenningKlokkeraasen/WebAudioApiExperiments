define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/Specialized/HarmonicGenerator/HarmonicGenerator.js'
	], function(Analyser, MasterSection, HarmonicGenerator) {
		return {
			title : 'Harmonics / Additive synthesis',
			description : 'Add harmonics to a single sine wave, in various algorithms, results in sawtooth, square and triangle waves',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: HarmonicGenerator, id: 'harmgen1' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches: [ 
					{ from: 'harmgen1', to: 'masterSection1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' },
				]
			}
		};
	}
);
