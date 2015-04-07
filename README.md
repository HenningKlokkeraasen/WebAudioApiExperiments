WebAudioApiExperiments
======================

Web Audio API Experiments


Requirements:

Add js libs:
	/thirdparty/jquery-2.1.1.min.js
	/thirdparty/handlebars-v1.3.0.js
	/thirdparty/require.js
	/thirdparty/knob.js 				from https://github.com/eskimoblood/jim-knopf
		wrap in
		define([], function() { 
			...
		return { 'Knob' : Knob, 'Ui' : Ui }; });

Status
Currently in the process of switching to require.js