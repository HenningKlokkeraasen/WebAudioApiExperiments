
/*


	Layout Controller - control if something can be floated


*/

// Global stuff because window.setTimeout and window.resize can not be scoped with this

var globalLayoutControllers = [];

function globalCheckIfItCanFloat() {
	$.each(globalLayoutControllers, function(index, item) {
		item.checkIfItCanFloat();
	});
}
 
 // elementToMoveSelector should be relative to the other two selectors, e.g. >canvas
 // position should be 'left' or 'right'
function LayoutController(originalContainerSelector, floatingContainerSelector, elementToMoveSelector, position) {
	this.originalContainerSelector = originalContainerSelector;
	this.floatingContainerSelector = floatingContainerSelector;
	this.elementToMoveSelector = elementToMoveSelector;
	this.position = position;

	this.track();
	globalLayoutControllers.push(this);
}

LayoutController.prototype.track = function() {
	if (globalLayoutControllers.length > 0) 
		return;

	// Check 5 millisec after page load (?)
	window.setTimeout(globalCheckIfItCanFloat, 500);
	// And check whenever window is resized
	$(window).resize(globalCheckIfItCanFloat);
};

LayoutController.prototype.canMoveToFloating = true;

LayoutController.prototype.canMoveBack = true;

LayoutController.prototype.checkIfItCanFloat = function() {
	var windowWidth = $(window).width(); // e.g. 1920
	var breakpointishMaxWidthInPx = $('body > header').css('max-width'); // e.g. 1020px
	var floatingWidthInPx = $(this.floatingContainerSelector).css('width'); // e.g. 400px

	var breakpointishMaxWidth = parseInt(breakpointishMaxWidthInPx, 10);
	var floatingWidth = parseInt(floatingWidthInPx, 10);

	// because main content is centered, can only look at half the width
	var doubledFloatingWidth = floatingWidth * 2;

	var spaceNeeded = breakpointishMaxWidth + doubledFloatingWidth;

	if (windowWidth >= spaceNeeded) {
		// It can float
		this.showContainerFloating();
		this.moveToFloating();
		//console.log("It can float. window width " + windowWidth + " spaceNeeded " + spaceNeeded);
	}
	else {
		// It can NOT float
		this.hideContainerFloating();
		this.moveBackToOriginal();
		//console.log("It can NOT float. window width " + windowWidth + " spaceNeeded " + spaceNeeded);
	}
};

LayoutController.prototype.hideContainerFloating = function() {
	$(this.floatingContainerSelector).addClass('hideMe');
};

LayoutController.prototype.showContainerFloating = function() {
	$(this.floatingContainerSelector).removeClass('hideMe');
};

LayoutController.prototype.moveToFloating = function() {
	if (this.canMoveToFloating) {
		$(this.originalContainerSelector + this.elementToMoveSelector).detach().appendTo(this.floatingContainerSelector);
		this.canMoveToFloating = false;
		this.canMoveBack = true;
	}
};

LayoutController.prototype.moveBackToOriginal = function() {
	if (this.canMoveBack) {
		$(this.floatingContainerSelector + this.elementToMoveSelector).detach().appendTo(this.originalContainerSelector);
		this.canMoveBack = false;
		this.canMoveToFloating = true;
	}
};
