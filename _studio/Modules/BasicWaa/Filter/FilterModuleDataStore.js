define([], function() { return { Modules : 
	[  
	   {  
	      name:'Filter 1',
	      shortName:'filter1',
	      t_params:{  
	         indexChecked:0
	      }
	   },
	   {  
	      name:'Filter 2',
	      shortName:'filter2',
	      t_params:{  
	         indexChecked:1
	      }
	   },
	   {  
	      name:'Filter 3',
	      shortName:'filter3',
	      t_params:{  
	         indexChecked:2
	      }
	   },
	   {  
	      name:'Filter 4',
	      shortName:'filter4',
	      t_params:{  
	         indexChecked:3
	      }
	   },
	   {  
	      name:'Filter',
	      shortName:'filter5',
	      t_params:{  
	         indexChecked:0
	      }
	   },
	   // new 2016
	   // Filter modes:
	   // - resonant: High and Low Pass filter that can resonate
	   // - band: Band Pass and Band Stop (notch)
	   // - shelf: Lowshelf, Highshelf, Negative lowshelf, Negative highshelf
	   // - peaking
	   // - allpass
	   // - all (default, do nothing - for backwards comp)
	   {
		   name: 'Resonant Filter',
		   shortName: 'resonant1',
		   mode: 'resonant'
	   },
	   {
		   name: 'Band Pass / Stop Filter',
		   shortName: 'band1',
		   mode: 'band'
	   },
	   {
		   name: 'Shelf Filter',
		   shortName: 'shelf1',
		   mode: 'shelf'
	   },
	   {
		   name: 'Peaking Filter',
		   shortName: 'peaking1',
		   mode: 'peaking'
	   },
	   {
		   name: 'All Pass Filter',
		   shortName: 'allpass1',
		   mode: 'allpass'
	   }
	]
};});
