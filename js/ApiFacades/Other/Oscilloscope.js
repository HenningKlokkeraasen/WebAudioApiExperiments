
/*


	Oscilloscope - uses requestAnimationFrame
	From http://webaudiodemos.appspot.com/oscilloscope/index.html

*/

window.requestAnimationFrame = (window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame);

function Oscilloscope(canvasFacade) {
	this.analyser = null; // should be set later

	this.canvasFacade = canvasFacade;

	// Needed to redraw canvas
	this.canvasWidth = canvasFacade.getWidth();
	this.canvasHeight = canvasFacade.getHeight();
	//this.canvasFillStyle = canvasFacade.getFillStyle();
}

Oscilloscope.prototype.stop = function() {
	this.isStopped = true;
}

Oscilloscope.prototype.init = function(analyser) {
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

	this.data = new Uint8Array(analyser.frequencyBinCount); // (time domain)

	console.log('oscilloscope starts rendering');

	// draw will be called recursively by requestAnimationFrame
	requestAnimationFrame(this.draw.bind(this));
}

Oscilloscope.prototype.draw = function() {
	var context = this.canvasFacade.getDrawContext();

	if (this.isStopped) {
		//console.log("this oscilloscope is stopped. will not call draw() recursively anymore");
		return;
	}

	var data = this.data;
	var scaling = this.canvasHeight/256;

	this.analyser.getByteTimeDomainData(data);

	this.drawXAxisLines(context);

	context.strokeStyle = "white";

	context.beginPath();

	var zeroCross = this.findFirstPositiveZeroCrossing(data, this.canvasWidth);

	context.moveTo(0,(256-data[zeroCross])*scaling);
	for (var i=zeroCross, j=0; (j<this.canvasWidth)&&(i<data.length); i++, j++)
		context.lineTo(j,(256-data[i])*scaling);

	context.stroke();

	// Recurse
	requestAnimationFrame(this.draw.bind(this));
}

Oscilloscope.prototype.drawXAxisLines = function(context) {
	var quarterHeight = this.canvasHeight/4;

	context.strokeStyle = "red";
	context.lineWidth = 1;
	context.fillStyle="#004737";
	context.fillRect(0,0,this.canvasWidth, this.canvasHeight);
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(this.canvasWidth,0);
	context.stroke();
	context.moveTo(0,this.canvasHeight);
	context.lineTo(this.canvasWidth,this.canvasHeight);
	context.stroke();
	context.save();
	context.strokeStyle = "#006644";
	context.beginPath();
	if (context.setLineDash)
		context.setLineDash([5]);
	context.moveTo(0,quarterHeight);
	context.lineTo(this.canvasWidth,quarterHeight);
	context.stroke();
	context.moveTo(0,quarterHeight*3);
	context.lineTo(this.canvasWidth,quarterHeight*3);
	context.stroke();

	context.restore();
	context.beginPath();
	context.strokeStyle = "blue";
	context.moveTo(0,quarterHeight*2);
	context.lineTo(this.canvasWidth,quarterHeight*2);
	context.stroke();
};

Oscilloscope.prototype.MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

Oscilloscope.prototype.findFirstPositiveZeroCrossing = function(buf, buflen) {
  var i = 0;
  var last_zero = -1;
  var t;

  // advance until we're zero or negative
  while (i<buflen && (buf[i] > 128 ) )
    i++;

  if (i>=buflen)
    return 0;

  // advance until we're above MINVAL, keeping track of last zero.
  while (i<buflen && ((t=buf[i]) < this.MINVAL )) {
    if (t >= 128) {
      if (last_zero == -1)
        last_zero = i;
    } else
      last_zero = -1;
    i++;
  }

  // we may have jumped over MINVAL in one sample.
  if (last_zero == -1)
    last_zero = i;

  if (i==buflen)  // We didn't find any positive zero crossings
    return 0;

  // The first sample might be a zero.  If so, return it.
  if (last_zero == 0)
    return 0;

  return last_zero;
}





/*old draw function

Oscilloscope.prototype.draw = function() {
	//console.log("oscilloscope draw()"); expensive

	// redraw canvas
	this.canvasFacade.setWidth(this.canvasWidth);
	this.canvasFacade.setHeight(this.canvasHeight);

	// Visualize the live audio input
	// time domain
	var timeDomain = new Uint8Array(this.analyser.frequencyBinCount);
	this.analyser.getByteTimeDomainData(timeDomain);
	for (var i = 0; i < timeDomain.length; i++) {
		var value = timeDomain[i];
		var percent = value / 256;
		var height = this.canvasHeight * percent;
		var offset = this.canvasHeight - height - 1;
		var barWidth = this.canvasWidth / timeDomain.length;

		// redraw canvas
		this.canvasFacade.setFillStyle(this.canvasFillStyle);
		this.canvasFacade.fillRect(i * barWidth, offset, 1, 1);
	}

	// freq domain
	/*
	var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
	this.analyser.getByteFrequencyData(freqDomain);
	for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
		var value = freqDomain[i];
		var percent = value / 256;
		var height = this.canvasHeight * percent;
		var offset = this.canvasHeight - height - 1;
		var barWidth = this.canvasWidth / this.analyser.frequencyBinCount;

		var hue = i / this.analyser.frequencyBinCount * 360;

		// redraw canvas
		this.canvasFacade.setFillStyle('hsl(' + hue + ', 100%, 50%)');
		this.canvasFacade.fillRect(i * barWidth, offset, barWidth, 1);
	}
	

	// Repeat
	requestAnimationFrame(this.draw.bind(this));
}
*/
