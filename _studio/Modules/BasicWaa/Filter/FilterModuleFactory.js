define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/Filter/FilterFacade.js',
    ], function(ModuleFactoryBase, FilterFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        FilterModuleFactory.prototype = new ModuleFactoryBase();
        FilterModuleFactory.prototype.constructor = FilterModuleFactory;

        function FilterModuleFactory() {
            this.moduleCssClass = 'filter';
            
            
        }
        FilterModuleFactory.prototype.getModuleDefinition = function() {
            return {    
                handlebarsTemplateSelector : this.handlebarsTemplateSelector,
                facade : FilterFacade,
                parameters : [
                    { func: FilterFacade.prototype.setFrequencyByScale, selector: 'input[data-parameterType="frequency"]',      ev: 'input'     },
                    { func: FilterFacade.prototype.setQuality,          selector: 'input[data-parameterType="quality"]',        ev: 'input'     },
                    { func: FilterFacade.prototype.setGain,             selector: 'input[data-parameterType="gain"]',           ev: 'input'     },
                    { func: FilterFacade.prototype.setType,             selector: 'select[data-parameterType="filterType"]',    ev: 'change'    }


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
            return this.getModuleBase({
                name : moduleData.name, 
                sections : [ {
                    ranges : [
                        { label : 'F',  type : 'frequency',     min : 0,    max : 1,    value: 0.75,    step : 0.01,    name : moduleData.shortName + '_f'  }, 
                        { label : 'Q',  type : 'quality',       min : 0,    max : 1,    value: 0,       step : 0.01,    name : moduleData.shortName + '_q'  }, 
                        { label : 'G',  type : 'gain',          min : -4,   max : 4,    value: 0,       step : 0.01,    name : moduleData.shortName + '_g'  }

                    ],

                    selectLists : [
                        this.getFilterTypeSelectData('T', 'filterType', moduleData.t_params.indexChecked)
                    ],
                    rangeDisplayMode : 'knob'
            }]});
        };
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return FilterModuleFactory;
    }
);