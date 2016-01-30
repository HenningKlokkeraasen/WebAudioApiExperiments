define([
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	'/_studio/Modules/Composite/MasterSection/MasterSection.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',

	'/_studio/Modules/Composite/SlapbackDelay/SlapbackDelay.js',
	'/_studio/Modules/CustomModifiers/SimpleReverb/SimpleReverb.js',
	
	'/_studio/Modules/Composite/ChannelStrip/ChannelStrip.js',

	'/_studio/Modules/CustomModulators/LFO/Lfo.js',
	'/_studio/Modules/CustomModulators/ModulatorAudibleRange/ModulatorAudibleRange.js',

	'/_studio/Modules/TriggerSources/EnvelopeGenerator/EnvelopeGenerator.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, Convolver, WaveShaper, SlapbackDelay, SimpleReverb, ChannelStrip, LFO, ModulatorAudibleRange, EnvelopeGenerator, WebMidiInput) {
		return {
			title : 'Modular synth - large',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						moduleCollections : [


							{
								controller : WebMidiInput.Controller,
								factory : WebMidiInput.ModuleFactory,
								modules : WebMidiInput.Modules
							},
							
							// LFO

							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules.getItemsByShortName('lfo1')
							},
							
							// Sound generator

							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc5')
							},

							// Sound processors and modifiers

							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : Filter.Modules.getItemsByShortName('filter5')
							},

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain5')
							},
							
							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							},
							

						]
					},

					{
						moduleCollections : [

							// Modulator audible range

							{
								controller : ModulatorAudibleRange.Controller,
								factory : ModulatorAudibleRange.ModuleFactory,
								modules : ModulatorAudibleRange.Modules.getItemsByShortName('mar1')
							},
							
							// LFO

							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules.getItemsByShortName('lfo2')
							},

							// EG

							{
								controller : EnvelopeGenerator.Controller,
								factory : EnvelopeGenerator.ModuleFactory,
								modules : EnvelopeGenerator.Modules.getItemsByShortName('eg2', 'eg3', 'eg4')
							},

							// Modifiers
							
							{
								controller : Convolver.Controller,
								factory : Convolver.ModuleFactory,
								modules : Convolver.Modules
							},
							{
								controller : WaveShaper.Controller,
								factory : WaveShaper.ModuleFactory,
								modules : WaveShaper.Modules
							},

							// Custom modifiers

							{
								controller : SimpleReverb.Controller,
								factory : SimpleReverb.ModuleFactory,
								modules : SimpleReverb.Modules
							},
							{
								controller : SlapbackDelay.Controller,
								factory : SlapbackDelay.ModuleFactory,
								modules : SlapbackDelay.Modules
							},
							

						]
					},

					{
						moduleCollections : [

							{
								controller : ChannelStrip.Controller,
								factory : ChannelStrip.ModuleFactory,
								modules : ChannelStrip.Modules.getItemsByShortName('ch1', 'ch2', 'ch3', 'ch4')
							},
							
							{
								controller : MasterSection.Controller,
								factory : MasterSection.ModuleFactory,
								modules : MasterSection.Modules
							},

						]
					}
				],
				patches : [
					// Main audio route
					{
						from : 'osc5',
						to : 'filter5',
						type : 'audio'
					},
					{
						from : 'filter5',
						to : 'gain5',
						type : 'audio'
					},
					{
						from : 'gain5',
						to : 'ch1',
						type : 'audio'
					},
					{
						from : 'ch1',
						to : 'masterSection1',
						type : 'audio'
					},
					
					// Trigger / gate
					{
						from : 'webmidi1',
						to : 'eg4',
						type: 'trigger'
					},
					{
						from : 'eg4',
						to : 'gain5',
						type: 'trigger'
					},
					
					// Pitch / control / noteOn, noteOff
					{
						from: 'webmidi1',
						to: 'osc5',
						type: 'control'
					},
					
					// Modulation
					{
						from: 'lfo2',
						to: 'osc5',
						type: 'control'
					},
					
					// visual
					{
						from: 'masterSection1',
						to: 'analyser1',
						type: 'audio'
					}
				]
			},
		};
	}
);
