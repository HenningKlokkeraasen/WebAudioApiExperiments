
/*


	Factory for delay modules


*/

DelayModuleFactory.prototype = new ModuleFactoryBase();
DelayModuleFactory.prototype.constructor = DelayModuleFactory;

function DelayModuleFactory() {
    this.moduleCssClass = 'delay';
    
    
}
DelayModuleFactory.prototype.getModuleDefinition = function() {
    return {    
        handlebarsTemplateSelector : this.handlebarsTemplateSelector,
        facade : DelayFacade,
        parameters : [
			{ func : DelayFacade.prototype.setDelayTime, 	selector : 'input[data-parameterType="delayTime"]',			ev : 'input'    }
        

            


        ]
    };
};
// moduleData
//      name
//      shortName
//      d_params
//          min
//          max
//          val
//          stp
// 
//  
DelayModuleFactory.prototype.getModule = function(moduleData) {
    return this.getModuleBase({
        name : moduleData.name, 
        sections : [ {
            ranges : [
                this.getRangeControlData({ label : 'D',     type : 'delayTime',	params : moduleData.d_params,  name : moduleData.shortName + '_delay' })
                


            ]




    }]});
};
