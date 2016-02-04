define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Filter/FilterFacade.js',
    ], function(ModuleFactoryBase, FilterFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        FilterModuleFactory.prototype = new ModuleFactoryBase();
        FilterModuleFactory.prototype.constructor = FilterModuleFactory;

        function FilterModuleFactory() {
            this.headerCssClass = 'filter';
			this.moduleCssClass = 'darkmat';
            this.hasTriggerIn = true;
            this.hasControlIn = true;
        }
        FilterModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : FilterFacade,
                parameters : [
                    { func: FilterFacade.prototype.setFrequencyByScale, selector: 'input[data-parameterType="frequency"]',      ev: 'input'     },
                    { func: FilterFacade.prototype.setQuality,          selector: 'input[data-parameterType="quality"]',        ev: 'input'     },
                    { func: FilterFacade.prototype.setGain,             selector: 'input[data-parameterType="gain"]',           ev: 'input'     },
                    { func: FilterFacade.prototype.setType,             selector: 'input[data-parameterType="filterType"]',    ev: 'change'    }


                ]
            };
        };
        // moduleData
        //      name
        //      shortName
        //
        //
        //
        //
        //
        //      t_params
        //          indexChecked
        FilterModuleFactory.prototype.getModule = function(moduleData) {
			var indexChecked = moduleData.t_params != undefined && moduleData.t_params.indexChecked != undefined
				? moduleData.t_params.indexChecked
				: 0;
            var module = this.getModuleBase({
                name : moduleData.name, 
				shortName : moduleData.shortName,
                sections : [ {
                    ranges : [
                    ],

					radioButtonLists : [
						// this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType')

					],
                    rangeDisplayMode : 'knob'
            }]});
			switch (moduleData.mode) {
				case 'resonant':
					module.sections[0].ranges.add({ label : 'Cutoff frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Resonance (Q)',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterLowPassAndHighPassOptions(indexChecked));
					break;
				case 'band':
					module.sections[0].ranges.add({ label : 'Center frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth (Q)',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterBandPassAndBandStopOptions(indexChecked));
					break;
				case 'shelf':
					module.sections[0].ranges.add({ label : 'Limit frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Boost / attenuate',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					module.sections[0].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterShelfOptions(indexChecked));
					break;
				case 'peaking':
					module.sections[0].ranges.add({ label : 'Center frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth (Q)',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].ranges.add({ label : 'Boost / attenuate',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					// module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterPeakingOption(indexChecked));
					break;
				case 'allpass':
					module.sections[0].ranges.add({ label : 'Max frequency',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Bandwidth (Q)',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					// module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterAllPassOption(indexChecked));
					break;
				default: 
                    module.sections[0].ranges.add({ label : 'F',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  });
					module.sections[0].ranges.add({ label : 'Q',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  });
					module.sections[0].ranges.add({ label : 'G',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  });
					module.sections[0].radioButtonLists.add(this.getFilterTypeSelectData('Type', 'filterType', moduleData.shortName + '_filterType'));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterLowPassAndHighPassOptions(indexChecked));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterBandPassAndBandStopOptions(indexChecked));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterShelfOptions(indexChecked));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterAllPassOption(indexChecked));
					module.sections[0].radioButtonLists[0].radioButtons.addRange(this.getFilterPeakingOption(indexChecked));
					break;
			}
			return module;
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return FilterModuleFactory;
    }
);