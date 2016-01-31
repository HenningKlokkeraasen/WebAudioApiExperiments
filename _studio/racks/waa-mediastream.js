define([
	'/_studio/Modules/BasicWaa/AudioDestination/AudioDestination.js',
	
	'/_studio/Modules/BasicWaa/Analyser/Analyser.js',

	'/_studio/Modules/BasicWaa/MediaStream/MediaStream.js'
	], function(AudioDestination, Analyser, MediaStream) {
		return {
			title : 'Media Stream and Analyser',
			description : 'This rack shows the built-in MediaStream and Analyser nodes in the Web Audio API, '
				+ 'utilized to get audio from the device microphone, and displaying audio in an oscilloscope and frequency spectrum, respectively',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: MediaStream, id: 'mediastream1' },
							{ moduleMother: AudioDestination, id: 'audiodestination1' },
							{ moduleMother: Analyser, id: 'analyser1' },
							{ moduleMother: Analyser, id: 'analyser2' }
						]
					},
				]
			}
		};
	}
);
