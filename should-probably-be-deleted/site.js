
/*


	HTML5 APIs


*/

navigator.getUserMedia = (navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.oGetUserMedia ||
	navigator.msGetUserMedia);

window.requestAnimationFrame = (window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame);

window.audioContext = (window.AudioContext ||
	window.webkitAudioContext ||
	window.mozAudioContext ||
	window.oAudioContext ||
	window.msAudioContext);

/*


	XMLHttpRequest wrapper


*/
 
function XhrWrapper() {
	if (window.XMLHttpRequest)
		this.XhrIsEnabled = true;
	else
		this.XhrIsEnabled = false;
}

XhrWrapper.prototype.getArrayBuffer = function(url, successCallback, errorCallback, callbackObject) {
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

/*


	Web Audio API wrapper - master


*/
 
function WebAudioMaster() {
	if (window.audioContext) {
		this.WebAudioApiIsEnabled = true;
		this.audioContext = new window.audioContext();
		this.buffers = {};
	}
	else {
		this.WebAudioApiIsEnabled = false;
	}
}

/*


	Web Audio API wrapper - bufferer (downloader)


*/
 
function WebAudioBufferer(xhrWrapper, audioContext) {
	this.xhrWrapper = xhrWrapper;
	this.audioContext = audioContext;
	this.buffers = {};
}

WebAudioBufferer.prototype.bufferAudioFile = function(url) {
	console.log('bufferAudioFile for ' + url);
	// Get file as byte array asynchronously
	this.xhrWrapper.getArrayBuffer(url, this.onXhrSuccess, this.onXhrError, this);
};

WebAudioBufferer.prototype.onXhrSuccess = function(arrayBufferResponse, url) {
	console.log('xhr success for ' + url);
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

WebAudioBufferer.prototype.onXhrError = function() {
	console.error('XHR error');
};

WebAudioBufferer.prototype.onDecodeSuccess = function(buffer, url) {
	console.log('Decode success for ' + url + ', has length', buffer.length);
	this.buffers[url] = buffer;
};

WebAudioBufferer.prototype.onDecodeError = function(error) {
	console.error('decodeAudioData error', error);
};

/*


	Web Audio API wrapper - player


*/
 
function WebAudioPlayer(audioContext, buffers) {
	this.audioContext = audioContext;
	this.buffers = buffers;
}

WebAudioPlayer.prototype.playSound = function(originalUrl) {
	return this.playSoundTimed(originalUrl, 0);
}

WebAudioPlayer.prototype.playSoundTimed = function(originalUrl, time) {
  return this.playSoundFiltered(originalUrl, null, false, time);
}

WebAudioPlayer.prototype.playSoundFiltered = function(originalUrl, filter, loop, time) {
	var source = this.audioContext.createBufferSource();
	source.buffer = this.buffers[originalUrl];

	// Connect source to filter, filter to destination
	if (filter) {
		source.connect(filter);
		filter.connect(this.audioContext.destination);
	}
	else {
		source.connect(this.audioContext.destination);
	}

	// Play
	if (!time)
		time = 0;

	source.start(time);

	if (loop)
		source.loop = true;

	var filtertype = filter ? filter.type : '-';
  	console.log('Started playing from buffer with length ' + 
	  	source.buffer.length + 
	  	', at time ' + 
	  	time +
	  	', loop=' +
	  	loop +
	  	', with filter type ' +
	  	filtertype);

  	return source;
}

WebAudioPlayer.prototype.stopPlaying = function(source) {
	source.stop();
}

/*


	Web Audio API wrapper - drum machine


*/

function WebAudioDrumMachine(audioContext, player) {
	this.audioContext = audioContext;
	this.player = player;
}
 
WebAudioDrumMachine.prototype.playDrums = function(drumkitSequence) {
	var self = this;

	// Start playing the rhythm 100 milliseconds from 'now'
	var startTime = this.audioContext.currentTime + 0.100;
	
	// tempo = BPM (beats per minute)
	
	//var halfNoteTime = 60 * 2 / drumkitSequence.tempoInBpm;
	//var quarterNoteTime = 60 / drumkitSequence.tempoInBpm;
	var eighthNoteTime = 60 / 2 / drumkitSequence.tempoInBpm;
	//var sixteenthNoteTime = 60 / 2 / 2 / drumkitSequence.tempoInBpm;
	var noteTime = eighthNoteTime;

	console.log('Drum machine will start playing at ' +
		noteTime +
		' note time for ' +
		drumkitSequence.numberOfBars +
		' bars, with' +
		drumkitSequence.ticksPerBar +
		' ticks per bar, drum sequences are ' +
		drumkitSequence.drumSequences)

	// Play for numberOfBars bars
	for (var bar = 0; bar < drumkitSequence.numberOfBars; bar++) {
		var time = startTime + bar * drumkitSequence.ticksPerBar * noteTime;

		// Play each drum sequence in the drum kit sequence...
		$.each(drumkitSequence.drumSequences, function(i1, drumSequence) {
			 // ...on the beats in the beatList
			$.each(drumSequence.beatList, function(i2, beat) {
				self.player.playSoundTimed(drumSequence.bufferKey, time + ((beat - 1) * noteTime));
			})
		});
	}
}

/*


	Web Audio API wrapper - filter


*/

function WebAudioFilter(audioContext) {
	this.audioContext = audioContext;

	this.currentFilter = null;
	this.qualityMultiplier = 30; // todo parameterize

	this.createFilter();
}

WebAudioFilter.prototype.createFilter = function() {
	// Create the filter
	var filter = this.audioContext.createBiquadFilter();
	filter.type = filter.LOWPASS; // todo parameterize
	filter.frequency.value = 5000; // todo parameterize

	// Save filterNode for later access
	this.currentFilter = filter;
}

WebAudioFilter.prototype.changeFrequency = function(value) {
	//console.log("filter of type " +
	//	this.currentFilter.type +
	//	" will change frequency scaler to " +
	//	value)

	// Clamp the frequency between the minimum value (40 Hz) and half of the
	// sampling rate.
	var minValue = 40;
	var maxValue = this.audioContext.sampleRate / 2;

	// Logarithm (base 2) to compute how many octaves fall in the range
	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;

	// Compute a multiplier from 0 to 1 based on an exponential scale
	var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));

	// Get back to the frequency value between min and max
	this.currentFilter.frequency.value = maxValue * multiplier;
};

WebAudioFilter.prototype.changeQuality = function(value) {
	//console.log("filter of type " +
	//	this.currentFilter.type +
	//	" will change quality scaler to " +
	//	value)

	this.currentFilter.Q.value = value * this.qualityMultiplier;
};

/*


	Web Audio API wrapper - getUserMedia


*/

function WebAudioMicrophoneStreamProvider(audioContext, successCallback, errorCallback) {
	if (navigator.getUserMedia) {
		this.userMediaIsEnabled = true;
		this.successCallback = successCallback;
		this.errorCallback = errorCallback;
	}
	else {
		this.userMediaIsEnabled = false;
	}
}

WebAudioMicrophoneStreamProvider.prototype.getStream = function() {
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

WebAudioMicrophoneStreamProvider.prototype.onStreamSuccess = function(stream) {
	console.log('User has given access to microphone');
	this.successCallback(stream);
}

WebAudioMicrophoneStreamProvider.prototype.onStreamError = function(err) {
	console.error('User has NOT given access to microphone');
	this.errorCallback(err);
}

/*


	Web Audio API wrapper - bind stream and oscilloscope


*/

function WebAudioAnalyser(audioContext) {
	this.audioContext = audioContext;
}

WebAudioAnalyser.prototype.connectStreamToOscilloscope = function(stream, oscilloscope) {
	console.log('connecting stream to oscilloscope');

	// Wrap a MediaStreamSourceNode around the live input stream
	var input = this.audioContext.createMediaStreamSource(stream);

	this.connectInputToOscilloscope(input, oscilloscope);

	// todo hack to get mic to output
	return input;
}

WebAudioAnalyser.prototype.connectInputToOscilloscope = function(input, oscilloscope) {
	console.log('connecting input to oscilloscope');

	// Connect the input to a filter
	// ...

	var analyser = this.audioContext.createAnalyser(); // Note spelling of Analyser
	
	// Connect graph
	input.connect(analyser);
	oscilloscope.init(analyser);
}

WebAudioAnalyser.prototype.gainAndSendToOutput = function(input) {
	// TODO separation of conecenrs
	var gainNode = this.audioContext.createGain();
	input.connect(gainNode);
	gainNode.gain.value = 3;
	gainNode.connect(this.audioContext.destination);
}

/*


	Web Audio API wrapper - getUserMedia and requestAnimationFrame


*/

function WebAudioOscilloscope(canvasWrapper) {
	this.analyser = null;

	this.canvasWidth = canvasWrapper.width;
	this.canvasHeight = canvasWrapper.height;
	this.canvasFillStyle = canvasWrapper.fillStyle;

	this.canvasElement = canvasWrapper.element;
	this.canvasElement.width = this.canvasWidth;
	this.canvasElement.height = this.canvasHeight;
}

WebAudioOscilloscope.prototype.init = function(analyser) {
	// Setup animation
	if (!window.requestAnimationFrame) {
		console.log('requestAnimationFrame is NOT available');
		return;
	}
	else {
		console.log('requestAnimationFrame is available');
	}

	this.analyser = analyser;

	console.log('oscilloscope starts rendering');

	// draw will be called recursively by the analyser?
	requestAnimationFrame(this.draw.bind(this));
}

WebAudioOscilloscope.prototype.draw = function() {
	////console.log("oscilloscope is rendering");

	// Reset canvas
	this.canvasElement.width = this.canvasWidth;
	this.canvasElement.height = this.canvasHeight;
	var drawContext = this.canvasElement.getContext('2d');

	// Visualize the live audio input
	var times = new Uint8Array(this.analyser.frequencyBinCount);
	this.analyser.getByteTimeDomainData(times);
	for (var i = 0; i < times.length; i++) {
		var value = times[i];
		var percent = value / 256;
		var height = this.canvasHeight * percent;
		var offset = this.canvasHeight - height - 1;
		var barWidth = this.canvasWidth / times.length;
		drawContext.fillStyle = this.canvasFillStyle;
		drawContext.fillRect(i * barWidth, offset, 1, 1);
	}

	// Repeat
	requestAnimationFrame(this.draw.bind(this));
}

/*


	Web Audio API wrapper - oscillator


*/

function WebAudioOscillator(audioContext) {
	this.audioContext = audioContext;
}

WebAudioOscillator.prototype.startOscillator = function(type, frequency, semitone) {
	var oscillator = this.audioContext.createOscillator();
	oscillator.connect(this.audioContext.destination);

	oscillator.frequency.value = frequency;
	oscillator.detune.value = semitone * 100;

	//oscillator.type = oscillator.SINE;
	oscillator.type = type;

	oscillator.start(0);

	return oscillator;
}

WebAudioOscillator.prototype.changeFrequency = function(oscillator, frequency) {
	oscillator.frequency.value = frequency;
}

WebAudioOscillator.prototype.changeDetune = function(oscillator, semitone) {
	oscillator.detune.value = semitone * 100;
}

WebAudioOscillator.prototype.stopOscillator = function(oscillator) {
	oscillator.stop();
}

/*


	Startup


*/
 
$(document).ready(function() {
	console.log('ready');
	
	//
	// XHR
	//

	var xhrWrapper = new XhrWrapper();
	if (!xhrWrapper.XhrIsEnabled) {
		console.error('XMLHttpRequest is NOT available')
		return;
	}
	console.log('XMLHttpRequest is available');

	//
	// MASTER
	//

	// initialize
	var master = new WebAudioMaster();
	if (!master.WebAudioApiIsEnabled) {
		console.log('Web Audio is NOT available');
		return;
	}
	console.log('Web Audio is available');
	console.log(master.audioContext);

	//
	// BUFFERER
	//

	// Download (buffer) audio files
	var bufferer = new WebAudioBufferer(xhrWrapper, master.audioContext);
	$('#manualDrumButtons button').each(function() {
		bufferer.bufferAudioFile($(this).data('url'));
	})

	// Hold the buffers
	master.buffers = bufferer.buffers;
	delete bufferer;

	//
	// PLAYER
	//

	var player = new WebAudioPlayer(master.audioContext, master.buffers);

	// bind events - manual buttons
	$('#manualDrumButtons button').each(function() {
		$(this).bind('click',  function() {
			player.playSound($(this).data('url'));
		});
	})

	//
	// DRUM MACHINE
	//
	
	var drumMachine = new WebAudioDrumMachine(master.audioContext, player);

	// bind events - drum machine
	$('#drumMachineButtons button').each(function() {
		$(this).bind('click',  function() {
			var drumkitSequence = $(this).data('drumkitsequence');
			//var json = JSON.parse(drumkitSequence);
			//console.log(json);
			drumMachine.playDrums(drumkitSequence);
		});
	})

	//
	// FILTER
	//

	var filter = new WebAudioFilter(master.audioContext);

	// bind events - filters
	$('#filterButtons button').each(function() {
		$(this).bind('click',  function() {
			if (!$(this).data('isPlaying')) {
				var source = player.playSoundFiltered($(this).data('url'), filter.currentFilter, true);
				//console.log(source);
				$(this).data('source', source);
				$(this).data('isPlaying', true);
			}
			else{
				player.stopPlaying($(this).data('source'));
				$(this).data('isPlaying', false);
			}
		});
	})
	$('#filterButtons input[data-parameterType="frequency"]').each(function() {
		// bind to onInput to get mouseMove event (continous),
		// bind to onChange to get mouseOut event
		$(this).bind('input',  function() {
			filter.changeFrequency(this.value);
		});
	})
	$('#filterButtons input[data-parameterType="quality"]').each(function() {
		// bind to onInput to get mouseMove event (continous),
		// bind to onChange to get mouseOut event
		$(this).bind('input',  function() {
			filter.changeQuality(this.value);
		});
	})

	//
	// SYNTH / OSCILLATORS
	//
	var oscillator = new WebAudioOscillator(master.audioContext);
	var canvasWrapper = new CanvasWrapper(
		$('#oscilloscopeOscillators canvas')[0], 450, 200, 'lime');

	// bind events - oscillator
	$('#oscillators span').each(function() {
		var span = this;
		// buttons to start/stop an oscillator
		$(span).find("button").each(function() {
			$(this).bind('click',  function() {
				if (!$(this).data('isPlaying')) {
					// Play a sine wave at A4 frequency (440Hz)
					var type = $(this).siblings('select').val();
					console.log(type);
					var oscillatorNode = oscillator.startOscillator(type, 440, 0);
					$(this).data('oscillatorNode', oscillatorNode);
					$(this).data('isPlaying', true);

					setupOscilloscopeFromInput(master.audioContext, oscillatorNode, canvasWrapper);
				}
				else {
					oscillator.stopOscillator($(this).data('oscillatorNode'));
					$(this).data('isPlaying', false);
				}
			});
		});
		// sliders for an oscillator
		$(span).find('input[data-parameterType="frequency"]').each(function() {
			// bind to onInput to get mouseMove event (continous),
			// bind to onChange to get mouseOut event
			$(this).bind('input',  function() {
				var frequency = this.value;
				var oscillatorNode = $(this).siblings('button').data('oscillatorNode');
				oscillator.changeFrequency(oscillatorNode, frequency);
			});
		});
		$(span).find('input[data-parameterType="detune"]').each(function() {
			// bind to onInput to get mouseMove event (continous),
			// bind to onChange to get mouseOut event
			$(this).bind('input',  function() {
				var detune = this.value;
				var oscillatorNode = $(this).siblings('button').data('oscillatorNode');
				oscillator.changeDetune(oscillatorNode, detune);
			});
		});
	})

	//
	// MICROPHONE (getUserMedia), ANALYSER, CANVAS (requestAnimationFrame)
	//

	var mic = new WebAudioMicrophoneStreamProvider(master.audioContext,
		// successCallback
		function(stream) {
			var canvasWrapper = new CanvasWrapper($('#oscilloscopeMic canvas')[0], 450,	200, 'red');
			setupOscilloscopeFromStream(master.audioContext, stream, canvasWrapper);
		},
		// errorCallback
		function(err) {

		});
	if (mic.userMediaIsEnabled)
		console.log('getUserMedia is available');
	else 
		console.log('getUserMedia is NOT available');

	// bind events - mic
	$('#micButtons button').each(function() {
		$(this).bind('click',  function() {
			mic.getStream();
		});
	})
});

// todo find better place

function CanvasWrapper(element, width, height, fillStyle) {
	this.element = element;
	this.width = width;
	this.height = height;
	this.fillStyle = fillStyle;
}

function setupOscilloscopeFromStream(audioContext, stream, canvasWrapper) {
	var analyser = new WebAudioAnalyser(audioContext);
	var oscilloscope = new WebAudioOscilloscope(canvasWrapper);
	var input = analyser.connectStreamToOscilloscope(stream, oscilloscope);

	// TODO hack to get mic to output
	analyser.gainAndSendToOutput(input);
}

function setupOscilloscopeFromInput(audioContext, input, canvasWrapper) {
	var analyser = new WebAudioAnalyser(audioContext);
	var oscilloscope = new WebAudioOscilloscope(canvasWrapper);
	analyser.connectInputToOscilloscope(input, oscilloscope);
}
