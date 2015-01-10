
/*


	XMLHttpRequest wrapper


*/
 
function XhrFacade() {
	if (window.XMLHttpRequest)
		this.XhrIsEnabled = true;
	else
		this.XhrIsEnabled = false;
}

XhrFacade.prototype.getArrayBuffer = function(url, successCallback, errorCallback, callbackObject) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		// Initiate the success callback, with the callbackObject as the context
		successCallback.call(callbackObject, request.response, url)
	}
	request.onError = errorCallback;
	request.send();
}
