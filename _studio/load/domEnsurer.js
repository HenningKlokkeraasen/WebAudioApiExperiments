define([], function() {
	class DomEnsurer {
		ensureDocumentReady() {
			return new Promise(function(resolve, reject) {
				$(document).ready(resolve);
			});
		}
	}
	return DomEnsurer;
})