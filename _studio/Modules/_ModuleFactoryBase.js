define([
	], function() {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
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

		//  moduleData
		//		name
		// 		sections
		//  		ranges
		// 			radioButtonLists
		//			selectLists,
		//			checkBoxes
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

		// paramData
		//      label
		//      type
		//      params
		//          min
		//          max
		//          val
		//          stp
		//      name
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

		/*

		ModuleFactoryBase.prototype.getModuleDefinition = function() {
			var moduleDefinition = {
				handlebarsTemplateSelector : '#moduleTemplate',
				containerSelector : '',
				facade : FacadeBase,
				parameters : []
			};
			return moduleDefinition;	
		};

		ModuleFactoryBase.prototype.getDefinitionParam = function(func, paramType, ev) {
			return {
					func: func,
					selector: 'input[data-parameterType="' + paramType + '"]',
					ev: ev
				};
		};


		*/
		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return ModuleFactoryBase;
	}
);