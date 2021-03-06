/*
	Uses Handlebars.js to load templates
*/
define(['/bower_components/handlebars/handlebars.min.js'], function(Handlebars) { 
class TemplateLoader {
	loadTemplateWithHandlebars(containerSelector, templateSelector, dataForHandlebarsTemplate, callback) {
		$.each(dataForHandlebarsTemplate, function(i, context) {
			// Get the html from the template
			var source = $(templateSelector).html();

			// Compile a template in JavaScript by using Handlebars.compile
			var template = Handlebars.compile(source);

			// Get the HTML result of evaluating a Handlebars template by executing the template with a context.
			var html = template(context);

			// Render
			$(containerSelector).append(html);
		});

		// Callback when done
		callback();
	}
}

return TemplateLoader;
});