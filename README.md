WebAudioApiExperiments
======================

Web Audio API Experiments


Requirements:

Add js libs:
	/thirdparty/jquery-2.1.1.min.js
	/thirdparty/handlebars-v1.3.0.js
	/thirdparty/require.js
	/thirdparty/qwerty-hancock.js
	/thirdparty/knob.js 				from https://github.com/eskimoblood/jim-knopf
		and forked to https://github.com/HenningKlokkeraasen/jim-knopf

		should also be wrapped in
		define([], function() { 
			...
		return {
		  'Knob':Knob,
		  'Ui':Ui,
		  'Ui.Pointer':Ui.Pointer,
		  'Ui.Arc':Ui.Arc,
		  'Ui.Scale':Ui.Scale,
		  'Ui.Text':Ui.Text,
		  'Ui.El':Ui.El,
		  'Ui.El.Triangle':Ui.El.Triangle,
		  'Ui.El.Rect':Ui.El.Rect,
		  'Ui.El.Circle':Ui.El.Circle,
		  'Ui.El.Text':Ui.El.Text,
		  'Ui.El.Arc':Ui.El.Arc
		};});

Status:
Currently in the process of switching to require.js