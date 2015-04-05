/*
	Controller for keyboard bindings
*/
define([
	], function() {
		function AudioFilePlayerKeyboardController(subscriber, callbackWhenPressed, callbackWhenReleased) {
			var self = this;
			$(document).keydown(function(e) {
				// console.debug("Handler for .keydown() called. key: " + e.keyCode);
				if (e.keyCode in self.keyCodeToTopRowNumber)
					callbackWhenPressed.call(subscriber, self.keyCodeToTopRowNumber[e.keyCode]);
			});	

			$(document).keyup(function(e) {
				// console.debug("Handler for .keyup() called. key: " + e.keyCode);
				if (e.keyCode in self.keyCodeToTopRowNumber)
					callbackWhenReleased.call(subscriber, self.keyCodeToTopRowNumber[e.keyCode]);
			});	
		}

		// Number keys (top row not numpad)
		AudioFilePlayerKeyboardController.prototype.keyCodeToTopRowNumber = {
			49 : 1,
			50 : 2,
			51 : 3,
			52 : 4,
			53 : 5,
			54 : 6,
			55 : 7,
			56 : 8,
			// 57 : 9,

			// 48 : 0,
		};

		return AudioFilePlayerKeyboardController;
	}
);
