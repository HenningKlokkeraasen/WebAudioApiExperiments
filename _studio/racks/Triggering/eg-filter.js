define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	
	'/_studio/Gear/FinalStage.js'
	], function(Analyser, Oscillator, Filter, Gain, EnvelopeGenerator, FinalStage) {
		return {
			title : 'Envelope Generator to trigger Filter',
			description : 'This rack shows triggering. An Envelope Generator can be started, and triggers an attack-release-decay cycle.'
				+'(actually it just starts attack and then all sound is lost atm).'
				+' When stopped, it triggers the final release portion of the common ADSR envelope.'
				+'The EG controls the cutoff frequency of the filter, so the outcome is that the cutoff frequency starts at the min level, rises to the max level, decreases to the sustain level, then lingers until release, then decreases to the min level',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: EnvelopeGenerator, id: 'eg1' },
							{ moduleMother: Oscillator, id: 'osc5' },
							{ moduleMother: Filter, id: 'resonantvcf1' },
							{ moduleMother: Gain, id: 'gain5' }
						]
					},
					{
						gear: [
							FinalStage
						],
						modules: [
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}	
				],
				patches : [
					// Main audio route
					{ from : 'osc5', to : 'resonantvcf1', type : 'audio' },
					{ from : 'resonantvcf1', to : 'gain5', type : 'audio' },
					
					// Triggering
					{ from: 'eg1', to: 'resonantvcf1', type: 'trigger' },
				],
				moduleToGearPatches: [
					{ gear: 'finalStage1', from: 'gain5', to: 'gain6', type: 'audio' },
				],
				gearToModulePatches: [
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser1', type: 'audio' },
					{ gear: 'finalStage1', from: 'compressor1', to: 'analyser2', type: 'audio' }
				],
			}
		};
	}
);
