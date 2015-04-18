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
	'/_studio/Modules/TriggerSources/QwertyHancock/QwertyHancock.js'
	], function(Analyser, MasterSection, Oscillator, Filter, Gain, Convolver, WaveShaper, SlapbackDelay, SimpleReverb, ChannelStrip, LFO, ModulatorAudibleRange, EnvelopeGenerator, QwertyHancock) {
		return {
			title : 'Modular synth',
			description : 'Fully functional (but primitive), monophonic, monotimbral, modular synthesizer based on Web Audio API.',
			rackData : {
				rows : [
					{
						moduleCollections : [

							// LFO

							{
								controller : LFO.Controller,
								factory : LFO.ModuleFactory,
								modules : LFO.Modules.getItemsByShortName('lfo1')
							},

							// Qwerty Hancock

							{
								controller : QwertyHancock.Controller,
								factory : QwertyHancock.ModuleFactory,
								modules : QwertyHancock.Modules
							}

						]
					},

					{
						moduleCollections : [

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
							}

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

						]
					},

					// Modifiers

					{
						moduleCollections : [

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
								modules : ChannelStrip.Modules.getItemsByShortName('ch1', 'ch2')
							},

							{
								controller : MasterSection.Controller,
								factory : MasterSection.ModuleFactory,
								modules : MasterSection.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							},
						]
					}
				]
			},
		};
	}
);
