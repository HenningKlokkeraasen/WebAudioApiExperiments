define([
	'/_thirdparty/jquery-2.1.1.js',
    '/_thirdparty/handlebars-v1.3.0.js'
    ],
	function() {

		// a Handlebars helper that provides equality if condition
		Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		  if(v1 === v2) {
		    return options.fn(this);
		  }
		  return options.inverse(this);
		});

		// a Handlebars helper to get the middle of two values
		Handlebars.registerHelper('middleValue', function(v1, v2) {
		  var middleValue = (v1+v2)/2;
		  return middleValue;
		});

		// a Handlebars helper to get the hundreth of the sum of two values, multiplied by the multiplier
		Handlebars.registerHelper('percentage', function(v1, v2, multiplier) {
		  var result = (v1+v2)/100*multiplier;
		  return result;
		});
	}
);