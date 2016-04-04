define([
	], function() {
		function ModuleFactoryBase() {
			this.handlebarsTemplateSelector = '#moduleTemplate';
			this.moduleCssClass = '';
			this.headerCssClass = 'genericmodule';
			this.buttonCssClass = '';
			this.hasStartButton = false;
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
				buttonCssClass: this.buttonCssClass,
				hasStartButton : this.hasStartButton,
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

		return ModuleFactoryBase;
	}
);