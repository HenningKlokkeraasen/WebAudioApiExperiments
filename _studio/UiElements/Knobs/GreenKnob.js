
define([
	'/_thirdparty/knob.js'
	], function(JimKnopf) {
		GreenKnob = function() {
		};

		GreenKnob.prototype = Object.create(JimKnopf.Ui.prototype);

		GreenKnob.prototype.createElement = function() {
			JimKnopf.Ui.prototype.createElement.apply(this, arguments);
			this.addComponent(new JimKnopf.Ui.Pointer({
				type: 'Rect',
				pointerWidth: 3,
				pointerHeight: this.width / 5,
				offset: this.width / 2 - this.width / 3.3 - this.width / 10
			}));

			this.addComponent(new JimKnopf.Ui.Scale(this.merge(this.options, {
			drawScale: true,
			drawDial: false,
			radius: this.width/2.6})));

			var circle = new JimKnopf.Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
			this.el.node.appendChild(circle.node);
			this.el.node.setAttribute("class", "greenKnob");
		};

		return GreenKnob;
	}
);