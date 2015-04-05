
(function(window) {

	a = 5; // tolerated

	console.log(a);

})(window);

(function(window) {
	// strict mode
	'use strict';

	z = 6; // not tolerated

	console.log(z);
})(window);
