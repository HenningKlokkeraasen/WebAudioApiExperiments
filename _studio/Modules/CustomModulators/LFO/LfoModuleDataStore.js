define([], function() { return { Modules : 
	[  
	   {  
	      name:'LFO',
	      shortName:'lfo1',
	      f_params:{ min:0, max:20, val:5, stp:0.1 },
	      g_params:{ min:-200, max:200, val:30, stp:0.01 },
	      w_params:{ indexChecked:0 }
	   },
	   {  
	      name:'LFO 2',
	      shortName:'lfo2',
	      f_params:{ min:0, max:20, val:5, stp:0.1 },
	      g_params:{ min:-200, max:200, val:1, stp:0.01 },
	      w_params:{ indexChecked:0 }
	   },
	   {  
	      name:'LFO 3',
	      shortName:'lfo3',
	      f_params:{ min:0, max:20, val:5, stp:0.1 },
	      g_params:{ min:-200, max:200, val:1, stp:0.01 },
	      w_params:{ indexChecked:0 }
	   },
	   {
		  name: 'Modulator in audible range',
	      shortName:'mar1',
	      f_params:{ min:20, max:2000, val:440, stp:1 },
	      g_params:{ min:-200, max:200, val:10, stp:1 },
	      w_params:{ indexChecked:0 },
		  actsAsModulatorInAudibleRange: true
	   }
	]
};});
