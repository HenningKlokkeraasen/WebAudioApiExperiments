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
			this.node = this.input; // TODO verify
			
			return this;
		};

		FacadeBase.prototype.connect = function(destination) {
			this.output.connect(destination);
			return this;
		};

		FacadeBase.prototype.disconnect = function() {
			this.output.disconnect(0); // disconnects to all destinations (?)
		    return this;
		};
		/*
		FacadeBase.prototype.input = undefined;

		FacadeBase.prototype.output = undefined;

		FacadeBase.prototype.initNodes = function() { };
		FacadeBase.prototype.setDefaultValues = function() { };
		FacadeBase.prototype.wireUp = function() { };
		*/

		return FacadeBase;
	}
);
