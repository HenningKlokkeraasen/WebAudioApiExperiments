define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js'
    ], function(ModuleFactoryBase, OscillatorFacade) {

		OscillatorModuleFactory.prototype = new ModuleFactoryBase();
		OscillatorModuleFactory.prototype.constructor = OscillatorModuleFactory;

		function OscillatorModuleFactory() {
			this.moduleCssClass = 'oscillator';
			this.hasAudioIn = false;
			this.hasTriggerIn = true;
			this.hasControlIn = true;
			this.hasControlOut = true;
			this.hasStartButton = true;
		}
		OscillatorModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : OscillatorFacade,
				parameters : [
					{ func : OscillatorFacade.prototype.setFrequency, 	selector : 'input[data-parameterType="frequency"]',		ev : 'input'	},
					{ func : OscillatorFacade.prototype.setDetune, 		selector : 'input[data-parameterType="detune"]',		ev : 'input'	},
					{ func : OscillatorFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	}



				]
			};
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
		OscillatorModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)


					], 
					radioButtonLists : [
						this.getWaveTypeSelectObject1(moduleData.shortName, moduleData.w_params.indexChecked)

					],
					rangeDisplayMode : 'knob'
		    }]});
		};
		OscillatorModuleFactory.prototype.getFrequencyParamObject = function(moduleData) {
		    return this.getRangeControlData({ label : 'F',     type : 'frequency',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' });
		};
		OscillatorModuleFactory.prototype.getDetuneParamObject = function(shortName) {
			return	{ label : 'D',	type : 'detune',		min : -100,		max : 100,		value: 0,		step : 1,		name : shortName + '_detune'	};
		};
		OscillatorModuleFactory.prototype.getWaveTypeSelectObject1 = function(shortName, indexChecked) {
			return this.getWaveTypeSelectObject('W', 'waveType', shortName + '_wave', indexChecked);
		};

        return OscillatorModuleFactory;
    }
);