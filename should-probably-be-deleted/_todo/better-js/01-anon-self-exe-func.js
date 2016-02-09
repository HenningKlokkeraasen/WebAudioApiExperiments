
// wrap library in anonymous self-executing function

(function() {
	console.log('anon self-exe func');
	console.log(window);
})();

// convention to explicitly send in parameters
(function(window) {
	console.log(window);
})(window);

// locally scoped variables not avail outside
(function(window) {

	var x;
	x = 3;

	console.log(x);
})(window);

console.log(x); // unedefined

// export to make avail outside
(function(window) {

	var y;
	y = 4;

	console.log(y);

	// Export
	window.y = y;
})(window);

console.log(y);