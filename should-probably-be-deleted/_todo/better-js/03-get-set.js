
(function(window) {
	'use strict';

	// getters and setters

	// on a prototype
	function DelayNode() {
		this.delayTime = 10;
	}
	DelayNode.prototype = {
		get delayTime() {
			return this._delayTime;
		},
		set delayTime(value) {
			this._delayTime = value;
		}
	};

	// on an object
	var gainNode = {
		_gain : 1,
		get gain() {
			return this._gain;
		},
		set gain(value) {
			this._gain = value;
		}
	};

	// Export
	window.DelayNode = DelayNode;
	window.gainNode = gainNode;
})(window);


var delayNode = new DelayNode();
console.log(delayNode.delayTime);
delayNode.delayTime = 5;
console.log(delayNode.delayTime);

var gainNode = gainNode;
console.log(gainNode.gain);
gainNode.gain = 0.5;
console.log(gainNode.gain);