define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/WaveShaper/WaveShaperFacade.js'
    ], function(ModuleFactoryBase, WaveShaperFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		WaveShaperModuleFactory.prototype = new ModuleFactoryBase();
		WaveShaperModuleFactory.prototype.constructor = WaveShaperModuleFactory;

		function WaveShaperModuleFactory() {
			this.moduleCssClass = 'waveshapermodule';
			
			
		}
		WaveShaperModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : WaveShaperFacade,
				parameters : [
				// reverb build impulse is expensive. // bind to change instead of input
					{ func : WaveShaperFacade.prototype.setAmount, 		selector : 'input[data-parameterType="amount"]',		ev : 'change'	},
					{ func : WaveShaperFacade.prototype.setOversample, 	selector : 'input[data-parameterType="oversample"]',	ev : 'change'	}
					


				]
			};
		};
		// moduleData
		// 		name
		// 		shortName
		// 
		//	
		//
		//
		//	
		// 
		//	
		WaveShaperModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
		        sections : [ {
					ranges : [
						{ label : 'A',	type : 'amount',		min : 0,		max : 100,		value: 50,		step : 1,		name : moduleData.shortName + '_amount'	}
						


					], 
					radioButtonLists : [
						this.getOversampleSelectObject(moduleData.shortName)

					],
					rangeDisplayMode : 'knob'
		    }]});
		};
		WaveShaperModuleFactory.prototype.getOversampleSelectObject = function(shortName) {
			return { 
				label : 'O',
				type : 'oversample',
				rdoName : shortName + '_oversample',
				radioButtons : [
		    		{ value : 'none', 			name : 'none',		selected : true  },
		    		{ value : '2x', 			name : '2x',		selected : false },
		    		{ value : '4x', 			name : '4x',		selected : false }
			]};
		};
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return WaveShaperModuleFactory;
    }
);