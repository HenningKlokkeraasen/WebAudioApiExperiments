define([
	'/_thirdparty/jquery-2.1.1.js',
    '/_thirdparty/handlebars-v1.3.0.js'
    ],
	function() {
		Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		  if(v1 === v2) {
		    return options.fn(this);
		  }
		  return options.inverse(this);
		});
	}
);