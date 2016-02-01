define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, EnvelopeGenerator) {
		return {
			title : 'Envelope Generator to trigger Oscillator',
			description : 'This rack shows triggering. An Envelope Generator can be started, and triggers an attack-release-decay cycle.'
				+' When stopped, it triggers the final release portion of the common ADSR envelope.'
				+'(actually it doesnt atm).'
				+'The EG controls the frequency of the oscillator, so the outcome is that the frequency starts from the min level, rises to the max level, decreases to the sustain level, then lingers until release, then decreases to the min level',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'filter5' },
							{ moduleMother: Gain, id: 'gain5' }
						]
					},
					{
						modules: [
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}	
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'filter5', type : 'audio' },
					{ from : 'filter5', to : 'gain5', type : 'audio' },
					{ from : 'gain5', to : 'masterSection1', type : 'audio' },
					
					// Triggering
					{ from: 'eg1', to: 'osc5', type: 'trigger' },
					
					// visual
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' }
				]
			}
		};
	}
);
