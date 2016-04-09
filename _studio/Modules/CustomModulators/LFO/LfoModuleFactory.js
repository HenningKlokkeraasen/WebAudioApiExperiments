define([
    '/_studio/Modules/BasicWaa/Oscillator/OscillatorModuleFactory.js',
	'/_studio/Modules/CustomModulators/LFO/LfoFacade.js'
    ], function(OscillatorModuleFactory, LfoFacade) {
		LfoModuleFactory.prototype = new OscillatorModuleFactory();
		LfoModuleFactory.prototype.constructor = LfoModuleFactory;

		function LfoModuleFactory() {
			// console.debug('ctor for LfoModuleFactory');
			OscillatorModuleFactory.call(this);
			this.headerCssClass = 'lfomodule';
			this.hasTriggerIn = false;
			this.hasModulateOut = true;
			this.hasModulateIn = true;
			this.hasAudioOut = false;
		}
		LfoModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : LfoFacade,
				parameters : [
					{ func : LfoFacade.prototype.setRate, 			selector : 'webaudio-knob[data-parameterType="rate"]',			ev : 'change'	},
					{ func : LfoFacade.prototype.setDepth, 			selector : 'webaudio-knob[data-parameterType="depth"]',			ev : 'change'	},
					{ func : LfoFacade.prototype.setShape,			selector : 'input[data-parameterType="waveType2"]',		ev : 'change'	},
					{ func : LfoFacade.prototype.setActsAsModulatorInAudibleRange, selector : 'input[data-parameterType="actsAsModulatorInAudibleRange"]', ev : 'change'},
					this.getStartStopButtonParameter(LfoFacade.prototype.toggleStartStop)
				]
			};
		};

		LfoModuleFactory.prototype.getModule = function(moduleData) {
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ {
		        	buttons: [
		        		this.getStartStopButtonControl(moduleData.shortName)
		        	]
		        }, {
					radioButtonLists : [
 						OscillatorModuleFactory.prototype.getWaveTypeSelectObject(moduleData.shortName, moduleData.w_params.indexChecked, 'Shape', 'waveType2', moduleData.shortName + '_waveType2')
 					]
		    }, {
					ranges : [
						this.getRangeControlData({ label : 'Rate',     type : 'rate',	params : moduleData.f_params,  name : moduleData.shortName + '_freq' }),
						this.getRangeControlData({ label : 'Depth',     type : 'depth',      params : moduleData.g_params,  name : moduleData.shortName + '_gain' })
					],
					rangeDisplayMode : 'webaudio-controls-color_knob'
		    }],
				hiddenParameters: [],
			});
			if (moduleData.actsAsModulatorInAudibleRange != undefined
				&& moduleData.actsAsModulatorInAudibleRange) {
					module.hiddenParameters.push({ type : 'actsAsModulatorInAudibleRange', value: moduleData.actsAsModulatorInAudibleRange });
					//moduleData.shortName + '_actsAsModulatorInAudibleRange'
				}
			return module;
		};

        return LfoModuleFactory;
    }
);