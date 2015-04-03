/*
	getUserMedia
*/
define([
	], function() {
		navigator.getUserMedia = (navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.oGetUserMedia ||
			navigator.msGetUserMedia);

		function UserMediaFacade(successCallback, errorCallback) {
			if (navigator.getUserMedia) {
				this.userMediaIsEnabled = true;
				this.successCallback = successCallback;
				this.errorCallback = errorCallback;
			}
			else {
				this.userMediaIsEnabled = false;
			}
		}

		UserMediaFacade.prototype.getStream = function() {
			var self = this;

			navigator.getUserMedia(
		    	// constraints
		    	{
		     		video: false,
		     		audio: true
		    	},
		    	// successCallback
		    	function(stream) {
		    		self.onStreamSuccess.call(self, stream);
		    	},
		    	// errorCallback
		    	this.onStreamError
		   );
		}

		UserMediaFacade.prototype.onStreamSuccess = function(stream) {
			console.log('User has given access to microphone');
			this.successCallback(stream);
		}

		UserMediaFacade.prototype.onStreamError = function(err) {
			console.error('User has NOT given access to microphone');
			this.errorCallback(err);
		}

		return UserMediaFacade;
	}
);