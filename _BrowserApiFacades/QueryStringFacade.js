define([
	], function() {
		function QueryStringFacade() {
		}

		QueryStringFacade.prototype.getQueryString = function() {
			var queryString = window.location.search;
			return queryString;		
		};

		QueryStringFacade.prototype.getParameterByName = function(name) {
		    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
			return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
		};

		return QueryStringFacade;
	}
);
