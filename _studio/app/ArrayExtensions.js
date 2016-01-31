
// Extends arrays with a function to filter, similar to LINQ [].where()
// Filters on the property named shortName in the objects in the array (so it is not a general function)
// Returns only those elements where the shortName property is equal to any of the arguments passed to the function

// usage: [].getItemsByShortName('id1', 'id2', ...)

//TODO extend to filter on any property name similar to C# expressions x => x.propName
//TODO error handling

Array.prototype.getItemsByShortName = function() {
	// The arguments object is an Array-like object corresponding to the arguments passed to a function
	// The arguments object is not an Array. However it can be converted to a real Array
	var arrayOfValuesToFilterOn = Array.prototype.slice.call(arguments);
	// The filter() method creates a new array with all elements that pass the test implemented by the provided function.
	return this.filter(function(item) { return arrayOfValuesToFilterOn.indexOf(item.shortName) > -1 ? true : false; } )
};

Array.prototype.add = function(elem) {
	this.push(elem);
}
Array.prototype.addRange = function(arr) {
	var that = this;
	arr.forEach(function(elem) {
		that.push(elem);
	});
}