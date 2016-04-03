define([
	'/_studio/Modules/AudioBuses/PatchBay/PatchBay.js',
	'/_studio/Modules/NonAudio/BlankPanel/BlankPanel.js',
	'/_studio/Modules/NonAudio/LedTest/LedTest.js',
	'/_studio/Modules/TriggerSources/WebMidiInput/WebMidiInput.js',
	'/_studio/Modules/Specialized/SuperOsc/SuperOsc.js',
	'/_studio/Modules/TriggerSources/StepSequencer/StepSequencer.js',

	'/_studio/Gear/BasicVoice.js',
	'/_studio/Gear/FinalStage.js'
	], function(PatchBay, BlankPanel, LedTest, WebMidiInput, SuperOsc, StepSequencer,
		BasicVoice, FinalStage) {
		return {
			title : 'Newest stuff',
			description : '',
			rackData : {
				rows : [
					{
						modules: [
							{ moduleMother: PatchBay, id: 'patchbay1' },
							{ moduleMother: BlankPanel, id: 'blankPanel1' },
							{ moduleMother: LedTest, id: 'ledTest1' },
							{ moduleMother: WebMidiInput, id: 'webmidi2' },
							{ moduleMother: SuperOsc, id: 'superosc1' },
							{ moduleMother: StepSequencer, id: 'stepseq1' }
						]
					},
					{
						gear: [
							BasicVoice,
							FinalStage
						],
					}
				],
				patches: [
					{ from: 'stepseq1', to: 'gain5', type: 'trigger' },
					{ from: 'stepseq1', to: 'osc5', type: 'frequency' },
					{ from: 'gain5', to: 'gain6', type: 'audio'}
				]
			}
		};
	}
);