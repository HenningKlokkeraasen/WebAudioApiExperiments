define([], function() { return { Modules : 
	[  
	   {  
	      name:'Osc 1',
	      shortName:'osc1',
	      f_params:{  
	         min:20,
	         max:5000,
	         val:440,
	         stp:1
	      },
	      w_params:{  
	         indexChecked:0
	      }
	   },
	   {  
	      name:'Osc 2',
	      shortName:'osc2',
	      f_params:{  
	         min:20,
	         max:5000,
	         val:440,
	         stp:1
	      },
	      w_params:{  
	         indexChecked:0
	      }
	   },
	   {  
	      name:'Osc 3',
	      shortName:'osc3',
	      f_params:{  
	         min:20,
	         max:5000,
	         val:440,
	         stp:1
	      },
	      w_params:{  
	         indexChecked:0
	      }
	   },
	   {  
	      name:'Osc 4 - full audible range',
	      shortName:'osc4',
	      f_params:{  
	         min:20,
	         max:20000,
	         val:10000,
	         stp:10
	      },
	      w_params:{  
	         indexChecked:0
	      }
	   },
	   {  
	      name:'Osc (VCO)',
	      shortName:'osc5',
	      f_params:{  
	         min:20,
	         max:5000,
	         val:440,
	         stp:1
	      },
	      w_params:{  
	         indexChecked:2
	      },
		  mode: 'vco'
	   },
	   
	//    {
	// 	   name: 'LFO',
	// 	   shortName: 'lfo1',
	// 	   f_params: {
	// 		   min: 0,
	// 		   max: 20,
	// 		   val: 1,
	// 		   stp: 0.1
	// 	   },
	//        w_params:{  
	//          indexChecked:2
	//       },
	// 	  mode: 'lfo'
	//    }
	]
};});
