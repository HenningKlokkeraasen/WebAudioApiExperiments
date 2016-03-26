define([], function() { return { Modules : 
	[  
	   {  
	      name:'Envelope Generator',
	      shortName:'eg1',
	      a_params:{  
	         min:0.01,
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
	         min:0.01,
	         max:3,
	         val:0.1,
	         stp:0.01
	     }
	   },

	   {  
	      name:'Env Gen Osc',
	      shortName:'eg2',
	      a_params:{  
	         min:0.01,
	         max:3,
	         val:0.02,
	         stp:0.01
	      },
	      d_params:{  
	         min:0,
	         max:3,
	         val:0.1,
	         stp:0.01
	      }
	   },

	   {  
	      name:'Env Gen Filter',
	      shortName:'eg3',
	      a_params:{  
	         min:0.01,
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
	         min:40,
	         max:5000,
	         val:1750,
	         stp:1
	      },
	      r_params:{  
	         min:0.01,
	         max:3,
	         val:0.1,
	         stp:0.01
	     }
	   },

	   {  
	      name:'Env Gen Amp',
	      shortName:'eg4',
	      a_params:{  
	         min:0.01,
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
	         min:0.01,
	         max:3,
	         val:0.01,
	         stp:0.01
	     }
	   },
	   
	   {  
	      name:'Env Gen',
	      shortName:'eg5',
	      a_params:{  
	         min:0.01,
	         max:3,
	         val:0.01,
	         stp:0.01
	      },
	      d_params:{   
	         min:0,
	         max:3,
	         val:0.2,
	         stp:0.01
	      },
	      s_params:{  
	         min:0,
	         max:1,
	         val:0,
	         stp:0.01
	      },
	      r_params:{  
	         min:0.01,
	         max:3,
	         val:0,
	         stp:0.01
	     }
	   }
	]
};});
