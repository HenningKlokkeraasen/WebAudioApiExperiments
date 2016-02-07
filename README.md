Web Audio API Experiments
======================

Some experiments with the Web Audio API and Web MIDI API.

Goals
-----

 - See and hear different sound waves
 - Subtractive synthesis
 - Additive synthesis
 - FM synthesis
 - Build synth modules such as VCOs, VCFs, VCFs, LFOs, Envelope Generators
 - Gate trigger to start EGs via computer keyboard, Web MIDI and step sequencer
 - CV to set oscillator frequency (noteon, noteoff) from the same, and modulate osc frequency, filter cutoff and amp gain with LFOs
 - Patching
 - Build WAA versions of classic synths such as Minimoog, TR-808, Jupiter-8
 - Build WAA versions of sounds and effects such as Reverb, Vocoder, SuperSaw, PWM, Tremolo, Vibrato, Flanger

Running this requires a browser that supports Web Audio API and Web MIDI API.

Requirements
------------

Add js libs:

-	/thirdparty/jquery-2.1.1.min.js
-	/thirdparty/handlebars-v1.3.0.js
-	/thirdparty/require.js
-	/thirdparty/qwerty-hancock.js
-	/thirdparty/knob.js 				

knob.js sourced from https://github.com/eskimoblood/jim-knopf
and forked to https://github.com/HenningKlokkeraasen/jim-knopf
with some improvements

Add this to the start of knob.js
        
		define([], function() { 

Add this to the end of knob.js

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

Add Web Components:

 - /thirdparty/led-atom.html from https://github.com/HenningKlokkeraasen/led-webcomponent

![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/sine3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/triangle3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/sawtooth3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/sawtooth-inverted3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/square3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/adsr3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/lpf3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/hpf3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/amp3.png)
![alt tag](https://raw.github.com/HenningKlokkeraasen/WebAudioApiExperiments/develop/img/mod3.png)


Concepts
--------

 - Module: Something that can produce, modify, modulate, trigger, analyse or output audio
 - Patch: A connection between two modules. Either an audio patch, trigger/gate patch, or control patch (set a frequency, modulate a gain level, etc)
 - Gear: Predefined set of modules and internal patching
 - Rack: 1-1 with an HTML page. Has 1 or more Modules and Gear in it

Responsibilities
----------------
 - Facade: A wrapper around a Web Audio API node, or a set of nodes. Responsible for interacting directly with the Web Audio API
 - Factory: Creates a module from a module definition/parameters
 - Controller: Renders a module to the DOM
