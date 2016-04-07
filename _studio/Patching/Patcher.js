define([], function() {
class Patcher {

setSource(coordinates, callback) {
	this.sourceCoordinates = coordinates;
	this.callback = callback;
	return this;
}

setDestination(coordinates, destination) {
	this.destinationCoordinates = coordinates;
	this.callback(destination);
	return this;
}

reset() {
	this.sourceCoordinates = null;
	this.destinationCoordinates = null;
	this.callback = null;
}
}
return Patcher;
});