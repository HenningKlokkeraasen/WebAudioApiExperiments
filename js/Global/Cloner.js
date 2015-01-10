
/*


	Clone JS objects


*/

function Cloner() {
}

Cloner.prototype.shallowClone = function(object) {
	// Not always safe but most efficient
	// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/5344074#5344074
	return JSON.parse(JSON.stringify(object));
	//return jQuery.extend({}, object);
};

Cloner.prototype.deepClone = function(object) {
	// Not always safe but most efficient
	// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/5344074#5344074
	//return JSON.parse(JSON.stringify(object));
	return jQuery.extend(true, {}, object);
};

// global
var cloner = new Cloner();
