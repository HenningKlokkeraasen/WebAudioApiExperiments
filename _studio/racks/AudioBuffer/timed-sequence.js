define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',
	
	'/_studio/Modules/AudioFilePlayer/TimedSequencePlayer/TimedSequencePlayer.js'
	], function(AudioDestination, Analyser, TimedSequencePlayer) {
		return {
			title : 'Playing audio files in timed sequences',
			description : 'This demonstrates the timing in the Web Audio API',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: TimedSequencePlayer, id: 'drumsequences1' }
						]
					},
					{
						modules: [
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
				],
				patches : [
					{ from : 'drumsequences1', to: 'audiodestination1', type: 'audio' },
					{ from: 'drumsequences1', to: 'analyser1', type: 'audio' },
					{ from: 'drumsequences1', to: 'analyser2', type: 'audio' }
				]
			},
		};
	}
);
