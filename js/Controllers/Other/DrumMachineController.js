
/*


	Handles binding of model and view for the drum machine concept


*/
 
function DrumMachineController(master, player, sessionStorageFacade) {
	this.master = master;
	this.player = player;
	this.sessionStorageFacade = sessionStorageFacade;
}

DrumMachineController.prototype.render = function(definition, model) {
	var controller = this;

	// Store in Session Storage
	model.forEach(function(drumkit) {
		controller.sessionStorageFacade.storeJson('drumkit-' + drumkit.drumkitname, drumkit.drumkitsequence);
	});

	TemplateLoader.prototype.loadTemplateWithHandlebars(definition.containerSelector, definition.handlebarsTemplateSelector, model, function() {
		// callback
		////console.log("templates for " + definition.containerSelector + " loaded");
		
		var drumMachine = new DrumMachine(controller.master.audioContext, controller.player);

		// bind events - drum machine
		$('#drumMachineContainer button').each(function() {
			
			$(this).bind('click',  function() {
				var key = $(this).data('drumkitname');
				var drumkitsequence = controller.sessionStorageFacade.getJson('drumkit-' + key);
				//console.log('data for key ' + key + ' in session storage: ');
				//console.log(drumkitsequence);
				drumMachine.playDrums(drumkitsequence);
			});
		});
	});
};
