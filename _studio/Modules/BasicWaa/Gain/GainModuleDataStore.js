define([], function() { return { Modules : 
	[  
	   {  
	      name:'Gain 1',
	      shortName:'gain0',
	      g_params:{  
	         min:0,
	         max:2,
	         val:1,
	         stp:0.01
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   },
	   {  
	      name:'Amplifier',
	      shortName:'gain1',
	      g_params:{  
	         min:1,
	         max:6,
	         val:1,
	         stp:0.01
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   },
	   {  
	      name:'Attenuator',
	      shortName:'gain2',
	      g_params:{  
	         min:0,
	         max:1,
	         val:0.5,
	         stp:0.01
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   },
	   {  
	      name:'On / Off',
	      shortName:'gain3',
	      g_params:{  
	         min:0,
	         max:1,
	         val:0,
	         stp:1
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   },
	   {  
	      name:'Inverter (Polarizer)',
	      shortName:'gain4',
	      g_params:{  
	         min:-1,
	         max:-1,
	         val:-1,
	         stp:1
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   },
	   {  
	      name:'Amp (VCA)',
	      shortName:'gain5',
	      g_params:{  
	         min:0,
	         max:1,
	         val:1,
	         stp:0.01
	      }
	   },
	//    TODO: generate DOM IDs in controllers, this is basically a duplicate of Gain 1
	   {  
	      name:'Gain / Trim',
	      shortName:'gain6',
	      g_params:{  
	         min:0,
	         max:2,
	         val:1,
	         stp:0.01
	      },
		  hasControlIn: false,
		  hasTriggerIn: false,
		  moduleCssClass: 'module-1hp'
	   }
	]	
};});
