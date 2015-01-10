
/*


	canvas


*/

function CanvasFacade(element, width, height, fillStyle) {
	this.element = element;
	this.setWidth(width);
	this.setHeight(height);
	this.setFillStyle(fillStyle);
}

CanvasFacade.prototype.getWidth = function() {
	return this.element.width;
}

CanvasFacade.prototype.setWidth = function(value) {
	this.element.width = value;
}

CanvasFacade.prototype.getHeight = function() {
	return this.element.height;
}

CanvasFacade.prototype.setHeight = function(value) {
	this.element.height = value;
}

CanvasFacade.prototype.getFillStyle = function() {
	return this.getDrawContext().fillStyle;
}

CanvasFacade.prototype.setFillStyle = function(value) {
	this.getDrawContext().fillStyle = value;
}

CanvasFacade.prototype.getDrawContext = function() {
	return this.element.getContext('2d');
}

// todo name parameters better
CanvasFacade.prototype.fillRect = function(i, j, k, l) {
	this.getDrawContext().fillRect(i, j, k, l);
}
