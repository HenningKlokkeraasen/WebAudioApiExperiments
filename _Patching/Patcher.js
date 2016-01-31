define([], function() {
/*
	Patcher
*/

function Patcher() {
}

Patcher.prototype.setSource = function(coordinates, callback) {
	this.sourceCoordinates = coordinates;
	this.callback = callback;
	return this;
}

Patcher.prototype.setDestination = function(coordinates, destination) {
	this.destinationCoordinates = coordinates;
	this.callback(destination);
	return this;
}

Patcher.prototype.reset = function() {
	this.sourceCoordinates = null;
	this.destinationCoordinates = null;
	this.callback = null;
}
	
return Patcher;
});