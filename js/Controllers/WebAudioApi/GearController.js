
function GearController() {

}

GearController.prototype.render = function(definition, model, containerSelector) {
	var controller = this;

	var foundElementsCount = $(containerSelector).length;
	if (foundElementsCount < 1)
		console.error('Could not find element with selector ' + containerSelector);
	if (foundElementsCount > 1)
		console.warn('More than one element with selector ' + containerSelector);

	TemplateLoader.prototype.loadTemplateWithHandlebars(containerSelector, definition.handlebarsTemplateSelector, model, function() {
		// callback
		////console.log("templates for " + containerSelector + " loaded");
		
		// Go through each of the modules in the container
		$(containerSelector + '>div').each(function() {
			/*
			var div = this;
			var dataContainer = controller.findTheDataContainer(div);
			
			if (definition.doNotCreateFacadeInstance)
				var facadeInstance = controller.master;
			else
				var facadeInstance = controller.createFacadeInstance(definition.facade, controller.master.audioContext, controller.master.buffers);

			controller.storeFacadeInDom(facadeInstance, dataContainer);

			controller.initEachParameter(facadeInstance, definition.parameters, dataContainer);
			
			controller.setupPatching(div, controller.patcher);

			controller.bindControlsToParameters(div, definition.parameters);
			*/
		});
	});
};
