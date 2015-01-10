
/*


	Data for the drum machine concept


*/

var drumMachineModuleDefinition = {
	handlebarsTemplateSelector : '#drumMachineTemplate', // different from most others
	containerSelector : '#drumMachineContainer',
};

var drumMachineModules = [
	{ drumkitname : 'Basic', drumkitsequence : 
		{
			numberOfBars : 2,
			ticksPerBar : 8,
			tempoInBpm : 125,
			drumSequences : [
				{
					bufferKey: '/audiofiles/21KICK.mp3',
					beatList: [1, 5]
				},
				{
					bufferKey: '/audiofiles/SNARE_2.WAV',
					beatList: [3, 7]
				},
				{
					bufferKey: '/audiofiles/OPNHIHAT.WAV',
					beatList: [1,2,3,4,5,6,7]
				},
				{
					bufferKey: '/audiofiles/BIGHIHAT.WAV',
					beatList: [8]
				}
			]
		}
	},

	{ drumkitname : 'Alternate', drumkitsequence : 
		{
			numberOfBars : 2,
			ticksPerBar : 8,
			tempoInBpm : 100,
			drumSequences : [
				{
					bufferKey: '/audiofiles/ELDRUM44.WAV',
					beatList: [2, 3, 5, 7]
				},
				{
					bufferKey: '/audiofiles/BIGHIHAT.WAV',
					beatList: [1, 4, 8]
				}
			]
		}
	},

	{ drumkitname : 'Techno', drumkitsequence : 
		{
			numberOfBars : 4,
			ticksPerBar : 8,
			tempoInBpm : 140,
			drumSequences : [
				{
					bufferKey: '/audiofiles/ELDRUM44.WAV',
					beatList: [1, 3, 5, 7]
				},
				{
					bufferKey: '/audiofiles/BEEP1.WAV',
					beatList: [3.8, 6.8]
				}
			]
		}
	},

	{ drumkitname : 'OffBeat', drumkitsequence : 
		{
			numberOfBars : 4,
			ticksPerBar : 8,
			tempoInBpm : 90,
			drumSequences : [
				{
					bufferKey: '/audiofiles/ELDRUM44.WAV',
					beatList: [1, 2.6, 4, 6]
				},
				{
					bufferKey: '/audiofiles/SNARE_3.WAV',
					beatList: [3, 7]
				},
				{
					bufferKey: '/audiofiles/BIGHIHAT.WAV',
					beatList: [8]
				}
			]
		}
	},

	{ drumkitname : 'More...', drumkitsequence : 
		{
			numberOfBars : 4,
			ticksPerBar : 8,
			tempoInBpm : 55,
			drumSequences : [
				{
					bufferKey: '/audiofiles/COWBELL2.mp3',
					beatList: [1, 2, 3, 4, 5, 6, 7, 7.5, 8.0, 8.3, 8.6]
				}
			]
		}
	}
];
