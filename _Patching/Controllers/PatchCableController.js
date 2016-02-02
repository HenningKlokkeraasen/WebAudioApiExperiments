
/*


	Controller for patch cable drawing


*/

function PatchCableController() {
}

PatchCableController.prototype.drawPatchCable = function(sourceCoordinates, destinationCoordinates, typeOfPatch) {
	var container = document.getElementById('patchCableContainer');
	var canvas = document.createElement('canvas');
	container.appendChild(canvas);

	var context = canvas.getContext('2d');

	var cableColor = this.getColorForTypeOfPatch(typeOfPatch);

	var margin = 10;

	// Draw either from l-r or r-l
	var fromLeftToRight = sourceCoordinates.x < destinationCoordinates.x;

	// Draw either from up-down or down-up
	var fromUpToDown = sourceCoordinates.y < destinationCoordinates.y;

	// Draw either from l-r or r-l
	var left = fromLeftToRight
		? sourceCoordinates.x - margin
		: destinationCoordinates.x - margin;

	var width = fromLeftToRight
		? destinationCoordinates.x - sourceCoordinates.x + (margin * 2)
		: sourceCoordinates.x - destinationCoordinates.x + (margin * 2);

	// Draw either from up-down or down-up
	var top = fromUpToDown
		? sourceCoordinates.y - margin
		: destinationCoordinates.y - margin;

	var height = fromUpToDown
		? destinationCoordinates.y - sourceCoordinates.y + (margin * 2)
		: sourceCoordinates.y - destinationCoordinates.y + (margin * 2);

	var unit = 'px';

	canvas.style.left = left + unit;
	canvas.style.top = top + unit;
	canvas.style.width = width + unit;
	canvas.style.height = height + unit;

	canvas.width = width; // no unit in html attributes
	canvas.height = height; // no unit in html attributes


	// debug background color
	// context.beginPath();
	// context.rect(0, 0, canvas.width, canvas.height);
	// context.fillStyle = this.getRandomColor();
	// context.fill();
	

	//context.fillStyle = getRandomColor();

	// Draw either from l-r or r-l
	var startX = fromLeftToRight
		? margin
		: width - margin;

	var endX = fromLeftToRight
		? width - margin
		: margin;
	
	// Draw either from up-down or down-up
	var startY = fromUpToDown
		? margin
		: height - margin;

	var endY = fromUpToDown
		? height - margin
		: margin;

	// Draw connector
	this.drawConnector(context, startX, startY, cableColor);
	this.drawConnector(context, endX, endY, cableColor);

	// Draw cable
	var quadCurveControlPointX = 
		(fromLeftToRight && !fromUpToDown) ?  (width * 0.8)
		: (fromLeftToRight && fromUpToDown) ?  (width * 0.2)
		: (!fromLeftToRight && !fromUpToDown) ?  (width * 0.8)
		: startX - (width * 0.2);
	var quadCurveControlPointY = (fromLeftToRight && !fromUpToDown) ?  (height * 0.8)
		: (fromLeftToRight && fromUpToDown) ?  (height * 0.8)
		: (!fromLeftToRight && !fromUpToDown) ?  (height * 0.2)
		:  (height * 0.8);
	//this.drawCableStraight(context, startX, startY, endX, endY, cableColor);
	this.drawCableQuadratic(context, startX, startY, quadCurveControlPointX, quadCurveControlPointY, endX, endY, cableColor);
	//this.drawCableBezier() TODO
}

PatchCableController.prototype.getColorForTypeOfPatch = function(typeOfPatch) {
	if (typeOfPatch == 'audio')
		return '#D53734';
	if (typeOfPatch == 'control')
		return '#2B4689';
	if (typeOfPatch == 'trigger')
		return '#1E926F';
	return 'black';
}

// PatchCableController.prototype.getRandomColor = function() {
// 	var r = this.getRandomRgbValue();
// 	var g = this.getRandomRgbValue();
// 	var b = this.getRandomRgbValue();
// 	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
// }

// PatchCableController.prototype.getRandomRgbValue = function() {
// 	var min = 0;
// 	var max = 255;
// 	var randomFloatingPointNumber = Math.random() * (max - min) + min;
// 	return Math.floor(randomFloatingPointNumber);
// }

PatchCableController.prototype.drawConnector = function(context, x, y, cableColor) {
	var radius = 6;

	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = cableColor;
	context.fill();
	context.lineWidth = 3;
	context.strokeStyle = cableColor;
	context.stroke();
};

PatchCableController.prototype.drawCableStraight = function(context, startX, startY, endX, endY, cableColor) {
	context.beginPath();
	context.lineWidth = 5;
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.strokeStyle = cableColor;
	context.lineCap = 'round';
	context.stroke();
};

PatchCableController.prototype.drawCableQuadratic = function(context, startX, startY, quadCurveControlPointX, quadCurveControlPointY, endX, endY, cableColor) {
	context.beginPath();
	context.lineWidth = 5;
	context.moveTo(startX, startY);
    // Control point (first two numbers) and end point (second two numbers)
    context.quadraticCurveTo(quadCurveControlPointX, quadCurveControlPointY, endX, endY);
	context.strokeStyle = cableColor;
	context.lineCap = 'round';
	context.stroke();
};

PatchCableController.prototype.hidePatchCables = function() {
	$('#patchCableContainer').addClass('hideMe');
}

PatchCableController.prototype.showPatchCables = function() {
	$('#patchCableContainer').removeClass('hideMe');
}
