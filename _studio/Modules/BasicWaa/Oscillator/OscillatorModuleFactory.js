define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/BasicWaa/Oscillator/OscillatorFacade.js'
    ], function(ModuleFactoryBase, OscillatorFacade) {

		OscillatorModuleFactory.prototype = new ModuleFactoryBase();
		OscillatorModuleFactory.prototype.constructor = OscillatorModuleFactory;

		function OscillatorModuleFactory() {
			// console.debug('ctor for OscillatorModuleFactory');
			this.headerCssClass = 'oscillator';
			this.buttonCssClass = 'round';
			this.moduleCssClass = 'fibredark';
			this.hasAudioIn = false;
			this.hasTriggerIn = true;
			this.hasControlIn = true;
			// this.hasControlOut = true;
			this.hasStartButton = true;
		}
		OscillatorModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : OscillatorFacade,
				parameters : [
					{ func : OscillatorFacade.prototype.setFrequency, 	selector : 'webaudio-knob[data-parameterType="frequency"]',		ev : 'change'	},
					{ func : OscillatorFacade.prototype.setDetune, 		selector : 'webaudio-knob[data-parameterType="detune"]',		ev : 'change'	},
					{ func : OscillatorFacade.prototype.setTypeByNumber,selector : 'webaudio-knob[data-parameterType="waveType2"]',		ev : 'change'	}


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
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					ranges: [
						{ label : 'Wave',	type : 'waveType2',		min : 0,		max : 3,		value: 0,		step : 1,		name : moduleData.shortName + '_waveType2',	}
					], 
					rangeDisplayMode : 'webaudio-controls-Custom-White_Wave'
					}, {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)
					], 
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }]});
			return module;
		};
		OscillatorModuleFactory.prototype.getFrequencyParamObject = function(moduleData) {
		    return this.getRangeControlData({ label : 'Frequency',     type : 'frequency',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' });
		};
		OscillatorModuleFactory.prototype.getDetuneParamObject = function(shortName) {
			return	{ label : 'Detune',	type : 'detune',		min : -100,		max : 100,		value: 0,		step : 1,		name : shortName + '_detune'	};
		};
		// TODO move this
		OscillatorModuleFactory.prototype.getWaveTypeSelectObject1 = function(shortName, indexChecked) {
			return this.getWaveTypeSelectObject('W', 'waveType', shortName + '_wave', indexChecked);
		};

        return OscillatorModuleFactory;
    }
);