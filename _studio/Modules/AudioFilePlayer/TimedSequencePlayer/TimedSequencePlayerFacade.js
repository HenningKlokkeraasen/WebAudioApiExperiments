/*
	Web Audio API wrapper - TimedSequencePlayer
*/
define([
	'/_studio/Modules/AudioFilePlayer/AudioFilePlayer/AudioFilePlayerFacade.js'
 	], function(AudioFilePlayerFacade) {
		TimedSequencePlayerFacade.prototype = Object.create(AudioFilePlayerFacade.prototype); //new AudioFilePlayerFacade();
		TimedSequencePlayerFacade.prototype.constructor = TimedSequencePlayerFacade;

		function TimedSequencePlayerFacade(audioContext, buffers, moduleSequences) {
			AudioFilePlayerFacade.call(this, audioContext, buffers); // base()
			this.moduleSequences = moduleSequences;
			return this;
		}

		TimedSequencePlayerFacade.prototype.playSequence = function(name) {
			// console.debug('TimedSequencePlayer should play sequence ' + name);
			var self = this;
			this.moduleSequences.forEach(function(moduleSequence) {
				moduleSequence.forEach(function(sequence) {
					// console.debug('sequence: ');
					// console.debug(sequence);
					if (sequence.sequenceName === name) {
						// console.debug('found sequence to play');
						self.privatePlaySequence(sequence.sequenceData);
					}
				});
			});
		};

		TimedSequencePlayerFacade.prototype.privatePlaySequence = function(drumkitSequence) {
			var self = this;

			// Start playing the rhythm 100 milliseconds from 'now'
			var startTime = this.audioContext.currentTime + 0.100;
			
			// tempo = BPM (beats per minute)
			
			//var halfNoteTime = 60 * 2 / drumkitSequence.tempoInBpm;
			//var quarterNoteTime = 60 / drumkitSequence.tempoInBpm;
			var eighthNoteTime = 60 / 2 / drumkitSequence.tempoInBpm;
			//var sixteenthNoteTime = 60 / 2 / 2 / drumkitSequence.tempoInBpm;
			var noteTime = eighthNoteTime;

			console.debug('TimedSequencePlayerFacade will start playing at ' +
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
						self.playSoundTimed(drumSequence.bufferKey, time + ((beat - 1) * noteTime));
					})
				});
			}
		};

		return TimedSequencePlayerFacade;
 	}
 );
