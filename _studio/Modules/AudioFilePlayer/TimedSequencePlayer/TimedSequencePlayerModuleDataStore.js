define([], function() { return { Modules : 
	[  
	   {  
			name:'Drum Sequences',
			shortName:'drumsequences1',
			sequences:[
				{
					sequenceName:'Basic',
					sequenceData:
					{
						numberOfBars : 2,
						ticksPerBar : 8,
						tempoInBpm : 125,
						drumSequences : [
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 13 - Acoustic/CYCdh_K4-Kick04.wav',
								beatList: [1, 5]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 13 - Acoustic/CYCdh_K4-Snr03.wav',
								beatList: [3, 7]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 13 - Acoustic/CYCdh_K4-ClHat03.wav',
								beatList: [1,2,3,4,5,6,7]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 13 - Acoustic/CYCdh_K4-OpHat02.wav',
								beatList: [8]
							}
						]
					}
				},

				{
					sequenceName: 'Alternate',
					sequenceData:{
						numberOfBars : 2,
						ticksPerBar : 8,
						tempoInBpm : 100,
						drumSequences : [
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 10 - Vinyl/CYCdh_VinylK3-Kick02.wav',
								beatList: [2, 3, 5, 7]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 10 - Vinyl/CYCdh_VinylK3-OpHat.wav',
								beatList: [1, 4, 8]
							}
						]
					}
				},

				{
					sequenceName:'Techno',
					sequenceData:{
						numberOfBars : 4,
						ticksPerBar : 8,
						tempoInBpm : 140,
						drumSequences : [
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 4 - Electro/CYCdh_ElecK01-Kick01.wav',
								beatList: [1, 3, 5, 7]
							},
							{
								bufferKey: '/audiofiles/soundeffects/BEEP1.WAV',
								beatList: [3.8, 6.8]
							}
						]
					}
				},

				{
					sequenceName:'OffBeat',
					sequenceData:{
						numberOfBars : 4,
						ticksPerBar : 8,
						tempoInBpm : 90,
						drumSequences : [
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 11 - Vinyl/CYCdh_VinylK4-Kick01.wav',
								beatList: [1, 2.6, 4, 6]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 11 - Vinyl/CYCdh_VinylK4-Snr05.wav',
								beatList: [3, 7]
							},
							{
								bufferKey: '/audiofiles/musicradar-drum-samples/Drum Kits/Kit 11 - Vinyl/CYCdh_VinylK4-OpHat02.wav',
								beatList: [8]
							}
						]
					}
				},

				{
					sequenceName:'More...',
					sequenceData:{
						numberOfBars : 4,
						ticksPerBar : 8,
						tempoInBpm : 55,
						drumSequences : [
							{
								bufferKey: '/audiofiles/drumsounds/COWBELL2.mp3',
								beatList: [1, 2, 3, 4, 5, 6, 7, 7.5, 8.0, 8.3, 8.6]
							}
						]
					}
				}
			]
	   }
	]
};});