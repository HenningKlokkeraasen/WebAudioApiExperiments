
/*


	Factory for MediaStream modules


*/

MediaStreamModuleFactory.prototype = new ModuleFactoryBase();
MediaStreamModuleFactory.prototype.constructor = MediaStreamModuleFactory;

function MediaStreamModuleFactory() {
	this.moduleCssClass = 'mediastreammodule';
	this.hasNoInputs = true;
	this.hasStartButton = true;
}
MediaStreamModuleFactory.prototype.getModuleDefinition = function() {
	return {
		handlebarsTemplateSelector : this.handlebarsTemplateSelector,
		facade : MediaStreamFacade,
		parameters : [

			
			



		]
	};
};
// moduleData
// 		name
// 		
//
//
//
//
//
// 		
//		
MediaStreamModuleFactory.prototype.getModule = function(moduleData) {
	return this.getModuleBase({
		name : moduleData.name, 











	});
};
