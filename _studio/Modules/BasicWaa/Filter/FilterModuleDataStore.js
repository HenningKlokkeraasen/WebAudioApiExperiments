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
	   // - resonantvcf: High and Low Pass filter that can resonate
	   //		and has Trigger In, Control In
	   {
		   name: 'Resonant HP/LP Filter',
		   shortName: 'resonant1',
		   mode: 'resonant'
	   },
	   {
		   name: 'Band Pass / Stop Filter',
		   shortName: 'band1',
		   mode: 'band',
	       t_params: {  
	         indexChecked: 2
	      }
	   },
	   {
		   name: 'High / Low Shelf Filter',
		   shortName: 'shelf1',
		   mode: 'shelf',
	       t_params: {  
	         indexChecked: 5
	      }
	   },
	   {
		   name: 'Peaking Filter',
		   shortName: 'peaking1',
		   mode: 'peaking'
	   },
	   {
		   name: 'All Pass Filter (Phaser)',
		   shortName: 'allpass1',
		   mode: 'allpass'
	   },
	   // TODO use a unique DOM id per rendered element, this is duplicate of resonant1 just to avoid having two resonant1 elements in the DOM
	   {
		   name: 'Resonant HP/LP Filter',
		   shortName: 'resonant2',
		   mode: 'resonant'
	   },
	   {
		   name: 'All Pass Filter (Phaser) 2',
		   shortName: 'allpass2',
		   mode: 'allpass'
	   },
	   {
		   name: 'All Pass Filter (Phaser) 3',
		   shortName: 'allpass3',
		   mode: 'allpass'
	   },
	   {
		   name: 'Resonant HP/LP Filter (VCF)',
		   shortName: 'resonantvcf1',
		   mode: 'resonantvcf',
	      hasModulateIn: true,
		  hasTriggerIn: true,
	   }
	]
};});
