
/*


	Oscilloscope - uses requestAnimationFrame
	From http://webaudiodemos.appspot.com/oscilloscope/index.html

*/

window.requestAnimationFrame = (window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame);

function FrequencySpectrumAnalyser(canvasFacade) {
	this.analyser = null; // should be set later

	this.canvasFacade = canvasFacade;

	// Needed to redraw canvas
	this.canvasWidth = canvasFacade.getWidth();
	this.canvasHeight = canvasFacade.getHeight();
	//this.canvasFillStyle = canvasFacade.getFillStyle();
}

FrequencySpectrumAnalyser.prototype.stop = function() {
	this.isStopped = true;
}

FrequencySpectrumAnalyser.prototype.init = function(analyser) {
	this.isStopped = false;
	
	// Setup animation
	if (!window.requestAnimationFrame) {
		console.log('requestAnimationFrame is NOT available');
		return;
	}
	else {
		//console.log('requestAnimationFrame is available');
	}

	this.analyser = analyser;

	//this.data = new Uint8Array(analyser.frequencyBinCount); // (time domain)

	console.log('frequency spectrum analyser starts rendering');

	// draw will be called recursively by requestAnimationFrame
	requestAnimationFrame(this.draw.bind(this));
}

FrequencySpectrumAnalyser.prototype.draw = function() {
	var context = this.canvasFacade.getDrawContext();

	if (this.isStopped) {
		//console.log("this oscilloscope is stopped. will not call draw() recursively anymore");
		return;
	}

	var SPACING = 3;
	var BAR_WIDTH = 1;
	var numBars = Math.round(this.canvasWidth / SPACING);
	var freqByteData = new Uint8Array(this.analyser.frequencyBinCount);

	this.analyser.getByteFrequencyData(freqByteData); 

	context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	context.lineCap = 'round';
	var multiplier = this.analyser.frequencyBinCount / numBars;

	// Draw rectangle for each frequency bin.
	for (var i = 0; i < numBars; ++i) {
		var magnitude = 0;
		var offset = Math.floor( i * multiplier );
		// gotta sum/average the block, or we miss narrow-bandwidth spikes
		for (var j = 0; j< multiplier; j++)
			magnitude += freqByteData[offset + j];
		magnitude = magnitude / multiplier;
		var magnitude2 = freqByteData[i * multiplier];
		context.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
		context.fillRect(i * SPACING, this.canvasHeight, BAR_WIDTH, -magnitude);
	}

	// Recurse
	requestAnimationFrame(this.draw.bind(this));
}
