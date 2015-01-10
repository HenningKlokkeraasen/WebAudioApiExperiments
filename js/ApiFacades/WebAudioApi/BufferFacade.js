
/*


	Web Audio API wrapper - bufferer (downloader)


*/
 
function BufferFacade(xhrFacade, audioContext) {
	this.xhrFacade = xhrFacade;
	this.audioContext = audioContext;
	this.buffers = {};
}

BufferFacade.prototype.bufferAudioFile = function(url, useCounter) {
	////console.log('bufferAudioFile for ' + url);
	// Get file as byte array asynchronously
	this.xhrFacade.getArrayBuffer(url, this.onXhrSuccess, this.onXhrError, this);
};

BufferFacade.prototype.onXhrSuccess = function(arrayBufferResponse, url) {
	////console.log('xhr success for ' + url);
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
	////console.log('Decode success for ' + url + ', has length', buffer.length);
	this.buffers[url] = buffer;

	this.counter++;
	if (this.counter == this.numberOfUrls) {
		console.log("Buffer - all files downloaded and decoded");
		this.callback();
	}
};

BufferFacade.prototype.onDecodeError = function(error) {
	console.error('decodeAudioData error', error);
};

BufferFacade.prototype.bufferAudioFiles = function(urls, callback) {
	console.log("Buffer - number of URLs: " + urls.length);
	this.callback = callback;
	this.counter = 0;
	this.numberOfUrls = urls.length;
	var self = this;
	$.each(urls, function(index, url) {
		self.bufferAudioFile(url);
	});
};

