define([], function() { return { Modules : 
	[  
	   {  
	      name: 'Oscilloscope',
	      shortName: 'analyser1',
		  hasOscilloscope : true,
		  hasFsa: false
	   },
	   {
		   name: 'Frequency Spectrum Analyser',
		   shortName: 'analyser2',
		   hasOscilloscope: false,
		   hasFsa: true
	   }
	]
};});
