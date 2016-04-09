define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/Specialized/SuperOsc/SuperOscFacade.js'
    ], function(OscillatorModuleFactory, SuperOscFacade) {
		SuperOscModuleFactory.prototype = new OscillatorModuleFactory();
		SuperOscModuleFactory.prototype.constructor = SuperOscModuleFactory;

		function SuperOscModuleFactory() {
					this.hasTriggerIn = true;
					this.hasModulateIn = true;
					this.hasFrequencyIn = true;
		}
		
		SuperOscModuleFactory.prototype.getModuleDefinition = function() {
			var def = OscillatorModuleFactory.prototype.getModuleDefinition();
			def.facade = SuperOscFacade;
			def.parameters = [
				{ func : SuperOscFacade.prototype.setFrequency, 	selector : 'webaudio-knob[data-parameterType="frequency"]',		ev : 'change'	},
				{ func : SuperOscFacade.prototype.setDetune, 		selector : 'webaudio-knob[data-parameterType="detune"]',		ev : 'change'	},
				{ func : SuperOscFacade.prototype.setType, 		selector : 'input[data-parameterType="waveType"]',		ev : 'change'	},
				{ func : SuperOscFacade.prototype.setPulseWidth, 	selector : 'webaudio-knob[data-parameterType="pulseWidth"]',		ev : 'change'	},
				this.getStartStopButtonParameter(SuperOscFacade.prototype.toggleStartStop)
			]
			return def;
		};
		
		SuperOscModuleFactory.prototype.getModule = function(moduleData) {
			var module = OscillatorModuleFactory.prototype.getModule.call(this, moduleData);
			module.sections[2].ranges.add(
				{ label : 'Pulse width',	type : 'pulseWidth',		min : 0,		max : 100,		value: 50,		step : 1,		name : moduleData.shortName + 'pw'	}
			);
			return module;
		};
		
		SuperOscModuleFactory.prototype.getWaveTypeSelectObject = function(shortName, indexChecked, label, type, rdoName) {
			var waveTypes = OscillatorModuleFactory.prototype.getWaveTypeSelectObject.call(this, shortName, indexChecked, label, type, rdoName);
			waveTypes.radioButtons.add(
				{ value: 'rampdown', name: 'Ramp Down', img: '/img/sawtooth-inverted3-28.png',	selected : indexChecked == 4 });
			waveTypes.radioButtons.add(
				{ value: 'sawtooth-triangular', name: 'Sawtooth-Triangular', img: '/img/saw-tri-28.png',	selected : indexChecked == 5 });
			waveTypes.radioButtons.add(
				{ value: 'pulse', name: 'Pulse', img: '/img/pulse-28.png',	selected : indexChecked == 6 });
			waveTypes.radioButtons.add(
				{ value: 'supersaw7', name: 'SuperSaw (7)', img: '/img/supersaw7-28.png',	selected : indexChecked == 7 });
			waveTypes.radioButtons.add(
				{ value: 'supersaw9', name: 'SuperSaw (9)', img: '/img/supersaw9-28.png',	selected : indexChecked == 8 });
			waveTypes.radioButtons.add(
				{ value: 'supersaw-swarm', name: 'BAD MF - DONT TRY THIS AT HOME', img: '/img/supersaw-swarm-28.png',	selected : indexChecked == 9 });
			return waveTypes;
		};
		
        return SuperOscModuleFactory;
    }
);