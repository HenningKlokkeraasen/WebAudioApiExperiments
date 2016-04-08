define([], function() {
	class CanvasFacade {
		constructor(element, width, height, fillStyle) {
			this.element = element;
			this.setWidth(width);
			this.setHeight(height);
			this.setFillStyle(fillStyle);
		}

		getWidth() {
			return this.element.width;
		}

		setWidth(value) {
			this.element.width = value;
		}

		getHeight() {
			return this.element.height;
		}

		setHeight(value) {
			this.element.height = value;
		}

		getFillStyle() {
			return this.getDrawContext().fillStyle;
		}

		setFillStyle(value) {
			this.getDrawContext().fillStyle = value;
		}

		getDrawContext() {
			return this.element.getContext('2d');
		}

		// todo name parameters better
		fillRect(i, j, k, l) {
			this.getDrawContext().fillRect(i, j, k, l);
		}
	}
	return CanvasFacade;
});