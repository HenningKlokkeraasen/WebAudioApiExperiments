
/*


	Controller for patch events


*/

function PatchController() {
}

PatchController.prototype.setupPatching = function(containerElement, patchInputSelector, patchOutputSelector, dataContainerSelector, facade, facadeInput, facadeOutput, facadeConnectFunc, patcher) {	//facadeDataAttr
	if (patchOutputSelector != undefined) {
		// Clicking an ouput: call the patcher with an anonymous function
		// as the callback that the patcher will call when an input has been clicked
		$(containerElement).find(patchOutputSelector).each(function() {
			$(this).bind('click', function(e) {
				var self = this;
				var coordinates = { x: e.pageX, y: e.pageY };
				
				patcher.reset();
				patcher.setSource(coordinates, function(destination) {
					// in the callback: get the facade, have it connect to the destination node
					// var facade = $(self).parent().parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);
					facadeConnectFunc.call(facade, destination);
					
					// console.log('Patching');
					// console.group();
					// console.log('From:');
					// console.log(facade); //console.log(facade.node);
					// console.log('To:')
					// console.log(destination);
					// console.groupEnd()

					PatchCableController.prototype.drawPatchCable(patcher.sourceCoordinates, patcher.destinationCoordinates);//TODO keep coordinates in this class
					patcher.reset();
				});
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
				patcher.setDestination(coordinates, facadeInput);
			});
		});
	}
};
