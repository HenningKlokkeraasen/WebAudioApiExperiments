define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js'
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in sound generation and modification nodes in the Web Audio API',
			rackData : {
				rows : [

					// Sound generators

					{
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc1')
							},

					// Sound processors and modifiers

							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : Filter.Modules.getItemsByShortName('filter1')
							},

							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain0')
							},

							{
								controller : Delay.Controller,
								factory : Delay.ModuleFactory,
								modules : Delay.Modules.getItemsByShortName('delay1')
							},
							
							{
								controller : Convolver.Controller,
								factory : Convolver.ModuleFactory,
								modules : Convolver.Modules
							},
							{
								controller : WaveShaper.Controller,
								factory : WaveShaper.ModuleFactory,
								modules : WaveShaper.Modules
							}
						]
					},
					
					{
						moduleCollections : [
,
							{
								controller : Compressor.Controller,
								factory : Compressor.ModuleFactory,
								modules : Compressor.Modules
							},
							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : AudioDestination.Modules
							},
					// Output and analyse


							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					},
				],
				patches : [
					// Main audio route
					{
						from : 'osc1',
						to : 'filter1',
						type : 'audio'
					},
					{
						from : 'filter1',
						to : 'gain0',
						type : 'audio'
					},
					{
						from : 'gain0',
						to : 'compressor1',
						type : 'audio'
					},
					{
						from : 'compressor1',
						to : 'audiodestination1',
						type : 'audio'
					},
					// An additional route with delay and convolver
					{
						from : 'gain0',
						to : 'delay1',
						type : 'audio'
					},
					{
						from : 'delay1',
						to : 'convolver1',
						type : 'audio'
					},
					{
						from : 'convolver1',
						to : 'compressor1',
						type : 'audio'
					},
					
					// Analyser
					{
						from: 'compressor1',
						to : 'analyser1',
						type: 'audio'
					}
				]
			}
		};
	}
);
