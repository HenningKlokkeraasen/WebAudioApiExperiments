
/*


	Web Audio API wrapper - player


*/
 
function Player(audioContext, buffers) {
	this.audioContext = audioContext;
	this.buffers = buffers;
}

Player.prototype.playSound = function(originalUrl) {
	return this.playSoundTimed(originalUrl, 0);
}

Player.prototype.playSoundTimed = function(originalUrl, time) {
  return this.playSoundLooped(originalUrl, false, time);
}

Player.prototype.playSoundLooped = function(originalUrl, loop, time) {
	var source = this.audioContext.createBufferSource();
	source.buffer = this.buffers[originalUrl];

	source.connect(this.audioContext.destination);

	// Play
	if (!time)
		time = 0;

	source.start(time);

	if (loop)
		source.loop = true;

  	console.log('Started playing from buffer at time ' +  time + ', loop=' + loop + ' originalUrl ' + originalUrl);

  	return source;
}

Player.prototype.stopPlaying = function(source) {
	source.stop();
}
