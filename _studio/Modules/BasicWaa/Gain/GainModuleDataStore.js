define([], function() { return { Modules : 
	[  
	   {  
	      name:'Gain',
	      shortName:'gain0',
	      g_params:{  
	         min:0,
	         max:2,
	         val:1,
	         stp:0.01
	      }
	   },
	   {  
	      name:'Gain 1: Amplify',
	      shortName:'gain1',
	      g_params:{  
	         min:1,
	         max:6,
	         val:1,
	         stp:0.01
	      }
	   },
	   {  
	      name:'Gain 2: Reduce',
	      shortName:'gain2',
	      g_params:{  
	         min:0,
	         max:1,
	         val:0.5,
	         stp:0.01
	      }
	   },
	   {  
	      name:'Gain 3: Mute / Pass-thru',
	      shortName:'gain3',
	      g_params:{  
	         min:0,
	         max:1,
	         val:0,
	         stp:1
	      }
	   },
	   {  
	      name:'Gain 4: Invert',
	      shortName:'gain4',
	      g_params:{  
	         min:-2,
	         max:0,
	         val:-1,
	         stp:0.01
	      }
	   }
	]	
};});
