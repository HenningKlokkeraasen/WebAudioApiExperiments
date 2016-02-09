/*
	Factory for Wave Table Osc modules
*/

define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/WaveTableOsc/WaveTableOscFacade.js',
	], function(OscillatorModuleFactory, WaveTableOscFacade) {
		WaveTableOscModuleFactory.prototype = new OscillatorModuleFactory();
		WaveTableOscModuleFactory.prototype.constructor = WaveTableOscModuleFactory;

		function WaveTableOscModuleFactory() {
			this.headerCssClass = 'waveTableOsc';

			
		}
		WaveTableOscModuleFactory.prototype.getModuleDefinition = function() {
			var base = OscillatorModuleFactory.prototype.getModuleDefinition.call(this);
			base.facade = WaveTableOscFacade;
			base.parameters[0].func = WaveTableOscFacade.prototype.setFrequency;
			base.parameters[1].func = WaveTableOscFacade.prototype.setDetune;
			base.parameters.splice(2, 1); 	// remove the set wave type
											// note splice() has side effects; it changes the array itself
			base.parameters.push(
				{ func : WaveTableOscFacade.prototype.setPeriodicWave, 	selector : 'select[data-parameterType="periodicWave"]',			ev : 'change'    }
			);

			return base;
		};
		// moduleData
		// 		name
		// 		shortName
		// 		f_params
		//			min
		//			max
		//			val
		//			stp
		// 		w_params
		//			indexChecked
		WaveTableOscModuleFactory.prototype.getModule = function(moduleData) {
			var base = OscillatorModuleFactory.prototype.getModule.call(this, moduleData);
			base.sections[0].radioButtonLists = undefined;
			
			base.sections.push({
					sectionName : '',
					selectLists : [
						{ 
							label : 'Periodic wave',
							type : 'periodicWave',
							options : WaveTableOscFacade.prototype.periodicWaves
						}
					],
			});
			return base;
		};

		return WaveTableOscModuleFactory;
	}
);