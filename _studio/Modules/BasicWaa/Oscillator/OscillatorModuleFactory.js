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
			// this.moduleCssClass = 'fibredark';
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
					// { func : OscillatorFacade.prototype.setTypeByNumber,selector : 'webaudio-knob[data-parameterType="waveType2"]',		ev : 'change'	}
					{ func : OscillatorFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	}
				]
			};
		};
		
		OscillatorModuleFactory.prototype.getModule = function(moduleData) {
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
					radioButtonLists : [
 						this.getWaveTypeSelectObject(moduleData.shortName, moduleData.w_params.indexChecked, 'Wave', 'waveType', moduleData.shortName + '_wave')
 					]
					}, {
					ranges : [
						this.getFrequencyParamObject(moduleData), 
						this.getDetuneParamObject(moduleData.shortName)
					], 
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }]});
			// switch (moduleData.mode) {
			// 	case 'lfo' : 
			// 		module.sections[0].ranges[0].label = 'Rate';
			// 		break;
			// 	default:
			// 		break;
			// }
			return module;
		};
		OscillatorModuleFactory.prototype.getFrequencyParamObject = function(moduleData) {
		    return this.getRangeControlData({ label : 'Frequency',     type : 'frequency',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' });
		};
		OscillatorModuleFactory.prototype.getDetuneParamObject = function(shortName) {
			return	{ label : 'Detune',	type : 'detune',		min : -100,		max : 100,		value: 0,		step : 1,		name : shortName + '_detune'	};
		};
		OscillatorModuleFactory.prototype.getWaveTypeSelectObject = function(shortName, indexChecked, label, type, rdoName) {
			return { 
				label : label,
				type : type,
				rdoName : rdoName,
				radioButtons : [
		    		{ value : 'sine', 		name : 'sine',		img: '/img/sine3-28.png',	selected : indexChecked == 0 },
		    		{ value : 'triangle', 	name : 'triangle',	img: '/img/triangle3-28.png',	selected : indexChecked == 1 },
		    		{ value : 'sawtooth', 	name : 'sawtooth',	img: '/img/sawtooth3-28.png',	selected : indexChecked == 2 },
		    		{ value : 'square', 	name : 'square',	img: '/img/square3-28.png',	selected : indexChecked == 3 }
			]};
		};
		
        return OscillatorModuleFactory;
    }
);