
/*


	Web Audio API wrapper - drum machine


*/

function DrumMachine(audioContext, player) {
	this.audioContext = audioContext;
	this.player = player;
}
 
DrumMachine.prototype.playDrums = function(drumkitSequence) {
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
};
