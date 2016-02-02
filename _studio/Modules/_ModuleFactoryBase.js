define([
	], function() {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		function ModuleFactoryBase() {
			this.handlebarsTemplateSelector = '#moduleTemplate';
			this.moduleCssClass = '';
			this.headerCssClass = '';
			this.hasStartButton = false;
			this.hasKeyboardInterface = false;
			this.hasAudioIn = true;
			this.hasAudioOut = true;
			this.hasTriggerIn = false;
			this.hasTriggerOut = false;
			this.hasControlIn = false;
			this.hasControlOut = false;
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
				hasStartButton : this.hasStartButton,
				hasKeyboardInterface : this.hasKeyboardInterface,
				hasAudioIn : this.hasAudioIn,
				hasAudioOut : this.hasAudioOut,
				hasTriggerIn : this.hasTriggerIn,
				hasTriggerOut : this.hasTriggerOut,
				hasControlIn : this.hasControlIn,
				hasControlOut : this.hasControlOut,
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

		ModuleFactoryBase.prototype.getWaveTypeSelectObject = function(label, type, rdoName, indexChecked) {
			return { 
				label : label,
				type : type,
				rdoName : rdoName,
				radioButtons : [
		    		{ value : 'sine', 		name : '&#8767;',	selected : indexChecked == 0 },
		    		{ value : 'triangle', 	name : '&#8896;',	selected : indexChecked == 1 },
		    		{ value : 'sawtooth', 	name : '&#8895;',	selected : indexChecked == 2 },
		    		{ value : 'square', 		name : '&#8851;',	selected : indexChecked == 3 }
			]};
		};

		ModuleFactoryBase.prototype.getFilterTypeSelectData = function(label, type, rdoName) {
			var data = { 
				label : label,
				type : type,
				rdoName : rdoName,
				radioButtons: []
			};
			return data;
		};
		ModuleFactoryBase.prototype.getFilterLowPassAndHighPassOptions = function(indexChecked) {
			return [ 
		    		{ value : 'lowpass', 	name : 'Lowpass', 	selected : indexChecked == 0 },
		    		{ value : 'highpass', 	name : 'Highpass', 	selected : indexChecked == 1 }
		    ];
		};
		ModuleFactoryBase.prototype.getFilterBandPassAndBandStopOptions = function(indexChecked) {
			return [ 
		    		{ value : 'bandpass', 	name : 'Bandpass', 	selected : indexChecked == 2 },
		    		{ value : 'notch', 		name : 'Notch', 	selected : indexChecked == 4 },
		    ];
		};
		ModuleFactoryBase.prototype.getFilterShelfOptions = function(indexChecked) {
			return [ 
		    		{ value : 'lowshelf', 	name : 'Highshelf',	selected : indexChecked == 5 },
		    		{ value : 'highshelf', 	name : 'Lowshelf', 	selected : indexChecked == 6 },
		    ];
		};
		ModuleFactoryBase.prototype.getFilterAllPassOption = function(indexChecked) {
			return [ 
		    		{ value : 'allpass', 	name : 'Allpass', 	selected : indexChecked == 3 },
		    ];
		};
		ModuleFactoryBase.prototype.getFilterPeakingOption = function(indexChecked) {
			return [ 
		    		{ value : 'peaking',	name : 'Peaking', 	selected : indexChecked == 7 }
		    ];
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