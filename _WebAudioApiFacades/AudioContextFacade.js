
/*


	Web Audio API wrapper - Audio Context


*/

window.audioContext = (window.AudioContext ||
	window.webkitAudioContext ||
	window.mozAudioContext ||
	window.oAudioContext ||
	window.msAudioContext);

function AudioContextFacade() {
	if (window.audioContext) {
		this.WebAudioApiIsEnabled = true;
		this.audioContext = new window.audioContext();
		this.buffers = {}; // used for files
	}
	else {
		this.WebAudioApiIsEnabled = false;
	}
	return this;
}
