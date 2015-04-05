define([], function() { return { Modules : 
	[  
	   {  
	      name:'Osc 1',
	      shortName:'osc1',
	      f_params:{  
	         min:20,
	         max:2000,
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
	         max:2000,
	         val:440,
	         stp:1
	      },
	      w_params:{  
	         indexChecked:1
	      }
	   },
	   {  
	      name:'Osc 3',
	      shortName:'osc3',
	      f_params:{  
	         min:2000,
	         max:10000,
	         val:3000,
	         stp:10
	      },
	      w_params:{  
	         indexChecked:2
	      }
	   },
	   {  
	      name:'Osc 4',
	      shortName:'osc4',
	      f_params:{  
	         min:10000,
	         max:20000,
	         val:11000,
	         stp:10
	      },
	      w_params:{  
	         indexChecked:3
	      }
	   }
	]
};});
