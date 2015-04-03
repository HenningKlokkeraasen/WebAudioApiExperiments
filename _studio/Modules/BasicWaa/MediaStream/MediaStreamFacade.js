/*
	Web Audio API wrapper - stream, usually from mic (getUserMedia)
*/
define([
	'/_WebAudioApiFacades/_FacadeBase2.js'
	], function(FacadeBase2) {
		MediaStreamFacade.prototype = Object.create(FacadeBase2.prototype);
		MediaStreamFacade.prototype.constructor = MediaStreamFacade;

		function MediaStreamFacade(audioContext) {
			FacadeBase2.call(this, audioContext); // base()

			return this;
		}

		// private
		MediaStreamFacade.prototype.initNodes = function() {
			this.input = undefined;
			this.output = this.audioContext.createGain();
			


		};

		// private
		MediaStreamFacade.prototype.setDefaultValues = function() {



		};

		// private
		MediaStreamFacade.prototype.wireUp = function() {






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