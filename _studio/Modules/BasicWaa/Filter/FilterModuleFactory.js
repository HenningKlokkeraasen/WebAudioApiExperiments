define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Filter/FilterFacade.js',
    ], function(ModuleFactoryBase, FilterFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        FilterModuleFactory.prototype = new ModuleFactoryBase();
        FilterModuleFactory.prototype.constructor = FilterModuleFactory;

        function FilterModuleFactory() {
            this.headerCssClass = 'filter';
			// this.moduleCssClass = 'darkmat';
        }
        FilterModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : FilterFacade,
                parameters : [
                    { func: FilterFacade.prototype.setFrequencyByScale, selector: 'webaudio-knob[data-parameterType="frequency"]',      ev: 'change'     },
                    { func: FilterFacade.prototype.setQuality,          selector: 'webaudio-knob[data-parameterType="quality"]',        ev: 'change'     },
                    { func: FilterFacade.prototype.setGain,             selector: 'webaudio-knob[data-parameterType="gain"]',           ev: 'change'     },
                    { func: FilterFacade.prototype.setType,             selector: 'input[data-parameterType="filterType"]',    ev: 'change'    }


                ]
            };
        };
		
        FilterModuleFactory.prototype.getModule = function(moduleData) {
			var indexChecked = moduleData.t_params != undefined && moduleData.t_params.indexChecked != undefined
				? moduleData.t_params.indexChecked
				: 0;
			switch (moduleData.mode) {
				case 'resonantvcf':
					this.hasTriggerIn = true;
					this.hasModulateIn = true;
					break;
				default:
					break;
			}
            var module = this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ 
					{ 
						ranges : [],
						rangeDisplayMode : 'webaudio-controls-color_knob'
					},
					{
						radioButtonLists : []
            }]});
			switch (moduleData.mode) {
				case 'resonant':
				case 'resonantvcf':
					module.sections[0].ranges.add({ label : 'Cutoff freq.',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Resonance',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[1].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterLowPassAndHighPassOptions(indexChecked));
					break;
				case 'band':
					module.sections[0].ranges.add({ label : 'Center freq.',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[1].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterBandPassAndBandStopOptions(indexChecked));
					break;
				case 'shelf':
					module.sections[0].ranges.add({ label : 'Limit freq.',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Boost/Att.',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					module.sections[1].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterShelfOptions(indexChecked));
					break;
				case 'peaking':
					module.sections[0].ranges.add({ label : 'Center freq.',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].ranges.add({ label : 'Boost/Att.',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					module.sections = module.sections.splice(0, 1);
					break;
				case 'allpass':
					module.sections[0].ranges.add({ label : 'Max freq.',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections = module.sections.splice(0, 1);
					break;
				default: 
                    module.sections[0].ranges.add({ label : 'Frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Q',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].ranges.add({ label : 'Gain',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					module.sections[1].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterLowPassAndHighPassOptions(indexChecked));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterBandPassAndBandStopOptions(indexChecked));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterShelfOptions(indexChecked));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterAllPassOption(indexChecked));
					module.sections[1].radioButtonLists[0].radioButtons.addRange(this.getFilterPeakingOption(indexChecked));
					break;
			}
			return module;
        };
		
		FilterModuleFactory.prototype.getFilterTypeSelectData = function(label, type, rdoName) {
			var data = { 
				label : label,
				type : type,
				rdoName : rdoName,
				radioButtons: []
			};
			return data;
		};
		FilterModuleFactory.prototype.getFilterLowPassAndHighPassOptions = function(indexChecked) {
			return [ 
		    		{ value : 'lowpass', 	name : 'Lowpass',	/*img: '/img/lpf3-28.png',*/ 	selected : indexChecked == 0 },
		    		{ value : 'highpass', 	name : 'Highpass',	/*img: '/img/hpf3-28.png',*/ 	selected : indexChecked == 1 }
		    ];
		};
		FilterModuleFactory.prototype.getFilterBandPassAndBandStopOptions = function(indexChecked) {
			return [ 
		    		{ value : 'bandpass', 	name : 'Bandpass', 	selected : indexChecked == 2 },
		    		{ value : 'notch', 		name : 'Bandstop', 	selected : indexChecked == 4 },
		    ];
		};
		FilterModuleFactory.prototype.getFilterShelfOptions = function(indexChecked) {
			return [ 
		    		{ value : 'lowshelf', 	name : 'Highshelf',	selected : indexChecked == 5 },
		    		{ value : 'highshelf', 	name : 'Lowshelf', 	selected : indexChecked == 6 },
		    ];
		};
		FilterModuleFactory.prototype.getFilterAllPassOption = function(indexChecked) {
			return [ 
		    		{ value : 'allpass', 	name : 'Allpass', 	selected : indexChecked == 3 },
		    ];
		};
		FilterModuleFactory.prototype.getFilterPeakingOption = function(indexChecked) {
			return [ 
		    		{ value : 'peaking',	name : 'Peaking', 	selected : indexChecked == 7 }
		    ];
		};

        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return FilterModuleFactory;
    }
);