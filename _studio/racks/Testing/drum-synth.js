define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',
	'/_studio/Modules/Specialized/NoiseGenerator/NoiseGenerator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js'
	], function(Analyser, MasterSection, NoiseGenerator, Filter, Convolver, EnvelopeGenerator, WebMidiInput) {
		return {
			title : 'Drum Synth - initial attempt',
			description : 'Noise generator, filter and envelope generator to produce drum synth sounds.',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: WebMidiInput, id:  'webmidi1' },
							{ moduleMother: NoiseGenerator, id: 'noisegen1' },
							{ moduleMother: Filter, id: 'resonant1' },
							{ moduleMother: Filter, id: 'resonant2' },
							{ moduleMother: Analyser, id: 'analyser1' }
						]
					},
					{
						modules: [
							{ moduleMother: EnvelopeGenerator, id: 'eg5' },
							{ moduleMother: Convolver, id: 'convolver1' },
							{ moduleMother: MasterSection, id: 'masterSection1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					}
				],
				patches: [ 
					{ from: 'webmidi1', to: 'eg5', type: 'trigger' },
					{ from: 'eg5', to: 'noisegen1', type: 'trigger' },
					
					{ from: 'noisegen1', to: 'resonant1', type: 'audio' },
					{ from: 'resonant1', to: 'resonant2', type: 'audio' },
					{ from: 'resonant2', to: 'masterSection1', type: 'audio' },
					
					{ from: 'masterSection1', to: 'analyser1', type: 'audio' },
					{ from: 'masterSection1', to: 'analyser2', type: 'audio' },
				]
			}
		};
	}
);
