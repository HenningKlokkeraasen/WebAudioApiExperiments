
/*


	Data for envelope generator modules


*/

var envelopeGeneratorModuleDefinition = {
	handlebarsTemplateSelector : '#moduleTemplate',
	facade : EnvelopeGeneratorFacade,
	parameters : [
		{ func : EnvelopeGeneratorFacade.prototype.setAttackTime, selector : 'input[data-parameterType="attackTime"]', ev : 'input'	},
		{ func : EnvelopeGeneratorFacade.prototype.setReleaseTime, selector : 'input[data-parameterType="releaseTime"]', ev : 'input' }




	]
};

var envelopeGeneratorModules = [
    { moduleName : 'Envelope',		moduleCssClass : 'genericmodule',	hasNoInputs : true,		
    	parameters :  [
    		{ label : 'A',	type : 'attackTime',	min : 0,	max : 1,	value: 0.2,		step : 0.1,		name : 'env1_attack'	},
    		{ label : 'R',	type : 'releaseTime',	min : 0,	max : 1,	value: 0.6,		step : 0.1,		name : 'env1_release'	}


    	]




    }











    
];
