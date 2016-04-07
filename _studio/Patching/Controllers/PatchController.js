/*
	Controller for patch events
*/
define([], function() {
class PatchController {

constructor(patchCableController) {
	this.patchCableController = patchCableController;
	this.drawnPatchCables = [];
}

setupPatching(
    containerElement, 
    patchInputSelector, 
    patchOutputSelector, 
    dataContainerSelector, 
    facade, 
    facadeInput, 
    facadeOutput, 
    facadeConnectFunc, 
    patcher) {	//facadeDataAttr
	var patchController = this;
	if (patchOutputSelector != undefined) {
		// Clicking an ouput: call the patcher with an anonymous function
		// as the callback that the patcher will call when an input has been clicked
		$(containerElement).find(patchOutputSelector).each(function() {
			$(this).bind('click', function(e) {
				var self = this;
				var coordinates = { x: e.pageX, y: e.pageY };
				var typeOfPatch = self.attributes['data-patch-type'].value.replace('Out', '');
				patchController.patchFrom(coordinates, facade, facadeConnectFunc, patcher, typeOfPatch);
			});
		});
	}
	if (patchInputSelector != undefined) {
		// Clicking an input: call the patcher with the node ready to be patched
		// as the parameter to the callback the patcher will call
		$(containerElement).find(patchInputSelector).each(function() {
			$(this).bind('click', function(e) {
				var coordinates = { x: e.pageX, y: e.pageY };
				// var facade = $(this).parent().parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);
				patchController.patchTo(coordinates, facadeInput, patcher);
			});
		});
	}
}

patch(
	fromCoordinates, 
	toCoordinates, 
    facade, 
    facadeInput, 
    facadeConnectFunc, 
    patcher,
	typeOfPatch) {
	this.patchFrom(fromCoordinates, facade, facadeConnectFunc, patcher, typeOfPatch);
	this.patchTo(toCoordinates, facadeInput, patcher);
}

patchFrom(coordinates, facade, facadeConnectFunc, patcher, typeOfPatch) {
	var self = this;
	patcher.reset();
	patcher.setSource(coordinates, function(destination) {
		// in the callback: get the facade, have it connect to the destination node
		// var facade = $(self).parent().parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);
		var result = facadeConnectFunc.call(facade, destination);
		// console.log(result);
		
		// console.log('Patching');
		// console.group();
		// console.log('From:');
		// console.log(facade); //console.log(facade.node);
		// console.log('To:')
		// console.log(destination);
		// console.groupEnd()

		if (result > 0) {
			var canvasAndContainer = self.patchCableController.drawPatchCable(patcher.sourceCoordinates, patcher.destinationCoordinates, typeOfPatch);
			// console.log(self);
			self.drawnPatchCables.push({
				facade: facade,
				destination: destination,
				typeOfPatch: typeOfPatch,
				canvasAndContainer: canvasAndContainer
			});
		}
		else if (result < 0) {
			var drawnPatchCable = self.drawnPatchCables.find(function(element, index, array) {
				if (element.facade == facade && element.destination == destination && element.typeOfPatch == typeOfPatch)
					return true;
				return false;
			});
			self.drawnPatchCables.splice(self.drawnPatchCables.indexOf(drawnPatchCable), 1);
			self.patchCableController.removePatchCable(drawnPatchCable.canvasAndContainer);
		}
		
		patcher.reset();
	});
}

patchTo(coordinates, facadeInput, patcher) {
	patcher.setDestination(coordinates, facadeInput);
}

}

return PatchController;
});