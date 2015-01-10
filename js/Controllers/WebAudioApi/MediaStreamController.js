
/*


	Controller for media strema (microphone)
	Inherits ButtonTriggeredModuleController

*/

MediaStreamController.prototype = Object.create(ButtonTriggeredModuleController.prototype); // new ButtonTriggeredModuleController();
MediaStreamController.prototype.constructor = MediaStreamController;

function MediaStreamController(master, patcher) {
	ButtonTriggeredModuleController.call(this, master, patcher);
}

MediaStreamController.prototype.bindStartStopButton = function(button, div) {
	var facade = this.findTheFacade(div);
	var dataContainer = this.findTheDataContainer(div);

	$(button).text('Capture');

	$(button).bind('click',  function() {
		// getUserMedia facade
		var userMediaFacade = new UserMediaFacade(
			// successCallback
			function(stream) {
				// create media stream audio source node
				facade.createMediaStreamSource(stream);
			},
			// errorCallback
			function(err) {
				console.log(err);
			}
		);
		if (userMediaFacade.userMediaIsEnabled)
			console.log('getUserMedia is available');
		else 
			console.log('getUserMedia is NOT available');

		// initiate request for getUserMedia
		userMediaFacade.getStream();

		//$(button).text('');
	});

	
}
