define([], function() { return { Modules : 
	[  
	   {  
	      name:'Envelope Generator',
	      shortName:'eg1',
	      a_params:{  
	         min:0.001,
	         max:3,
	         val:0.12,
	         stp:0.01
	      },
	      d_params:{  
	         min:0,
	         max:3,
	         val:0.3,
	         stp:0.01
	      },
	      s_params:{  
	         min:0,
	         max:1,
	         val:0.4,
	         stp:0.01
	      },
	      r_params:{  
	         min:0.001,
	         max:3,
	         val:0.1,
	         stp:0.01
	     },
	     hasStartStopButton: true
	   },

	   {  
	      name:'EG 1 (Pitch Envelope)',
	      shortName:'eg2',
	      a_params:{  
	         min:0.001,
	         max:3,
	         val:0.02,
	         stp:0.01
	      },
	      d_params:{  
	         min:0,
	         max:3,
	         val:0.1,
	         stp:0.01
	      },
	      s_params:{  
	         min:1,
	         max:1,
	         val:1,
	         stp:1
	      },
	    //   r_params:{  
	    //      min:0,
	    //      max:3,
	    //      val:0.1,
	    //      stp:0.01
	    //  }
	   },

	   {  
	      name:'EG 2 (Filter Envelope)',
	      shortName:'eg3',
	      a_params:{  
	         min:0.001,
	         max:3,
	         val:0.12,
	         stp:0.01
	      },
	      d_params:{  
	         min:0,
	         max:3,
	         val:0.7,
	         stp:0.01
	      },
	      s_params:{  
	         min:0,
	         max:1,
	         val:0.4,
	         stp:0.01
	      },
	      r_params:{  
	         min:0.001,
	         max:3,
	         val:0.1,
	         stp:0.01
	     }
	   },

	   {  
	      name:'EG 3 (Loudness Envelope)',
	      shortName:'eg4',
	      a_params:{  
	         min:0.001,
	         max:3,
	         val:0.01,
	         stp:0.01
	      },
	      d_params:{   
	         min:0,
	         max:3,
	         val:0.7,
	         stp:0.01
	      },
	      s_params:{  
	         min:0,
	         max:1,
	         val:0.4,
	         stp:0.01
	      },
	      r_params:{  
	         min:0.001,
	         max:3,
	         val:0.01,
	         stp:0.01
	     }
	   }
	]
};});
