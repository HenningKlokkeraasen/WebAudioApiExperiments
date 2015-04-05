/*
	Web Audio API wrapper - bufferer (downloader)
*/
define([
	'/_BrowserApiFacades/XhrFacade.js'
	], function(XhrFacade) {
		function BufferFacade(audioContext) {
			
			this.xhrFacade = new XhrFacade();
			if (!this.xhrFacade.XhrIsEnabled) {
				console.error('XMLHttpRequest is NOT available')
				return;
			}
			//console.debug('XMLHttpRequest is available');

			this.audioContext = audioContext;
			this.buffers = {};
		}

		BufferFacade.prototype.bufferAudioFile = function(url) {
			// console.debug('bufferAudioFile for ' + url);
			// Get file as byte array asynchronously
			this.xhrFacade.getArrayBuffer(url, this.onXhrSuccess, this.onXhrError, this);
		};

		BufferFacade.prototype.bufferAudioFiles = function(urls, callback) {
			// console.debug("Buffer - number of URLs: " + urls.length);
			this.callback = callback;
			this.counter = 0;
			this.numberOfUrls = urls.length;
			var self = this;
			$.each(urls, function(index, url) {
				self.bufferAudioFile(url);
			});
		};

		BufferFacade.prototype.onXhrSuccess = function(arrayBufferResponse, url) {
			// console.debug('xhr success for ' + url);
			var self = this;
			// Decode asynchronously
			// arrayBufferResponse should be an audio file
			this.audioContext.decodeAudioData(arrayBufferResponse,
				// successCallback
				function(buffer) {
					// Initiate the success callback, with self as the context
					self.onDecodeSuccess.call(self, buffer, url)
				},
				// errorCallback
				this.onDecodeError);
		};

		BufferFacade.prototype.onXhrError = function() {
			console.error('XHR error');
		};

		BufferFacade.prototype.onDecodeSuccess = function(buffer, url) {
			// console.debug('Decode success for ' + url + ', has length', buffer.length);
			this.buffers[url] = buffer;

			this.counter++;
			if (this.counter == this.numberOfUrls) {
				// console.debug("Buffer - all files downloaded and decoded");
				this.callback(this.buffers);
			}
		};

		BufferFacade.prototype.onDecodeError = function(error) {
			console.error('decodeAudioData error', error);
		};

		return BufferFacade;
	}
);