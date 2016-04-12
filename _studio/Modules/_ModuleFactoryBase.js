define([
	], function() {
		function ModuleFactoryBase() {
			this.handlebarsTemplateSelector = '#moduleTemplate';
			this.moduleCssClass = '';
			this.headerCssClass = 'genericmodule';
			this.hasKeyboardInterface = false;
			this.hasAudioIn = true;
			this.hasAudioOut = true;
			this.hasTriggerIn = false;
			this.hasTriggerOut = false;
			this.hasModulateIn = false;
			this.hasModulateOut = false;
			this.hasFrequencyIn = false;
			this.hasFrequencyOut = false;
			this.renderSectionsVertically = false;
		}

		ModuleFactoryBase.prototype.getModuleBase = function(moduleData) {
			return { 
				moduleName : moduleData.name,
				shortName: moduleData.shortName,
				moduleCssClass : this.moduleCssClass,
				headerCssClass : this.headerCssClass,
				hasKeyboardInterface : this.hasKeyboardInterface,
				hasAudioIn : this.hasAudioIn,
				hasAudioOut : this.hasAudioOut,
				hasTriggerIn : this.hasTriggerIn,
				hasTriggerOut : this.hasTriggerOut,
				hasModulateIn : this.hasModulateIn,
				hasModulateOut : this.hasModulateOut,
				hasFrequencyIn: this.hasFrequencyIn,
				hasFrequencyOut: this.hasFrequencyOut,
				sections : moduleData.sections,
				renderSectionsVertically : this.renderSectionsVertically,
				hiddenParameters : moduleData.hiddenParameters
			};
		};

		ModuleFactoryBase.prototype.getRangeControlData = function(paramData) {
			return { 
				label : paramData.label,
				type : paramData.type,
				min : paramData.params.min,
				max : paramData.params.max,
				value : paramData.params.val,
				step : paramData.params.stp,
				name : paramData.name
			};
		};

		ModuleFactoryBase.prototype.getStartStopButtonParameter = function(func, textWhenOn, textWhenOff) {
			return {
				func: func, 
				selector: 'button[data-parameterType="togglestartstop"]', 
				ev: 'click', 
				doNotInitOnRender: true, 
				textWhenOff: textWhenOff ? textWhenOff : 'Start', 
				textWhenOn: textWhenOn ? textWhenOn : 'Stop'
			};
		};

		ModuleFactoryBase.prototype.getStartStopButtonControl = function(shortName, buttonName, buttonLabel) {
			return {
                buttonId: shortName + '_start', buttonName: buttonName ? buttonName : 'Start', 
                  buttonLabel: buttonLabel ? buttonLabel : '', buttonCssClass: 'round', type: 'togglestartstop'
            };
		};

		return ModuleFactoryBase;
	}
);