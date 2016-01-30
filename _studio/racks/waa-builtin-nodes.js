define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',

	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/Oscillator/Oscillator.js',
	'/_studio/Modules/BasicWaa/Filter/Filter.js',
	'/_studio/Modules/BasicWaa/Gain/Gain.js',
	'/_studio/Modules/BasicWaa/Delay/Delay.js',
	'/_studio/Modules/BasicWaa/Convolver/Convolver.js',
	'/_studio/Modules/BasicWaa/WaveShaper/WaveShaper.js',
	'/_studio/Modules/BasicWaa/Compressor/Compressor.js',
	], function(AudioDestination, Analyser, Oscillator, Filter, Gain, Delay, Convolver, WaveShaper, Compressor) {
		return {
			title : 'Sound Generation and Modification',
			description : 'This rack shows the basic built-in sound generation and modification nodes in the Web Audio API - with more modules for more sound and patch possibilities.'
				+ ' You can e.g. run three oscillators with the same wave type and frequencey, but two of them slightly detuned in opposite directions. '
				+ ' Or two square waves with one slightly detuned to get pulse width modulation',
			rackData : {
				rows : [


					{
					// Sound generators
						moduleCollections : [
							{
								controller : Oscillator.Controller,
								factory : Oscillator.ModuleFactory,
								modules : Oscillator.Modules.getItemsByShortName('osc1', 'osc2', 'osc3', 'osc4')
							},
					// Sound processors and modifiers
							{
								controller : Filter.Controller,
								factory : Filter.ModuleFactory,
								modules : Filter.Modules.getItemsByShortName('filter1', 'filter2', 'filter3', 'filter4')
							},
						]
					},

					{
						moduleCollections : [
							{
								controller : Gain.Controller,
								factory : Gain.ModuleFactory,
								modules : Gain.Modules.getItemsByShortName('gain1', 'gain2', 'gain3', 'gain4')
							},
							{
								controller : Delay.Controller,
								factory : Delay.ModuleFactory,
								modules : Delay.Modules
							},
						]
					},

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
							{
								controller : Compressor.Controller,
								factory : Compressor.ModuleFactory,
								modules : Compressor.Modules
							},,
							{
								controller : AudioDestination.Controller,
								factory : AudioDestination.ModuleFactory,
								modules : AudioDestination.Modules
							},

							{
								controller : Analyser.Controller,
								factory : Analyser.ModuleFactory,
								modules : Analyser.Modules
							}
						]
					},
				]
			}
		};
	}
);