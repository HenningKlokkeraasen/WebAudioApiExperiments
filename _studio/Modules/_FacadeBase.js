/*
	Web Audio API wrapper - base
*/
define([
	], function() {
		function FacadeBase(audioContext) {
			this.audioContext = audioContext;

			this.initNodes();
		    this.setDefaultValues();
			this.wireUp();

			// backwards compatability
			this.node = this.input; // TODO remove

			return this;
		};

		FacadeBase.prototype.connect = function(destination) {
			if (destination instanceof AudioNode) {
				// audio graph
				this.output.connect(destination);
			} else {
				console.group();
				console.warn('destination is not an AudioNode. destination is:');
				console.warn(destination);
				console.warn('this is a/an');
				console.warn(this);
				console.groupEnd();
			}
			return this;
		};

		FacadeBase.prototype.disconnect = function() {
			this.output.disconnect(0); // disconnects to all destinations (?)
		    return this;
		};

		FacadeBase.prototype.input = undefined; // TODO rename to audioIn
		FacadeBase.prototype.output = undefined; // TODO rename to audioOut

		/*
		FacadeBase.prototype.initNodes = function() { };
		FacadeBase.prototype.setDefaultValues = function() { };
		FacadeBase.prototype.wireUp = function() { };
		*/

		return FacadeBase;
	}
);
