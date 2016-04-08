define([
], function() {
	class QueryStringFacade {
		getQueryString() {
			var queryString = window.location.search;
			return queryString;		
		};

		getParameterByName(name) {
		    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
			return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
		};
	}
return QueryStringFacade;
});