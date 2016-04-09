/*
	Web Audio API wrapper - stream, usually from mic / line in (getUserMedia)
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'BrowserApiWrappers/UserMediaFacade'
	], function(FacadeBase, UserMediaFacade) {
		MediaStreamFacade.prototype = Object.create(FacadeBase.prototype);
		MediaStreamFacade.prototype.constructor = MediaStreamFacade;

		function MediaStreamFacade(audioContext) {
			FacadeBase.call(this, audioContext); // base()

			return this;
		}

		// private
		MediaStreamFacade.prototype.initNodes = function() {
			this.input = undefined;
			this.output = this.audioContext.createGain();
		};

		// private
		MediaStreamFacade.prototype.setDefaultValues = function() {
			this.hasBeenStartedOnce = false;
		};

		// private
		MediaStreamFacade.prototype.wireUp = function() {
		};

		MediaStreamFacade.prototype.toggleStartStop = function() {
			if (this.hasBeenStartedOnce)
				return;

			var self = this;
			// getUserMedia facade
			var userMediaFacade = new UserMediaFacade(
				// successCallback
				function(stream) {
					// create media stream audio source node
					self.createMediaStreamSource(stream);
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

			this.hasBeenStartedOnce = true;
		};

		// to be called when a stream from getUserMedia has returned successfull
		MediaStreamFacade.prototype.createMediaStreamSource = function(stream) {
			console.log('creating source node from media stream');
			// Wrap a MediaStreamSourceNode around the live input stream
			var source = this.audioContext.createMediaStreamSource(stream);
			source.connect(this.output);
			return this;
		}

		return MediaStreamFacade;
	}
);