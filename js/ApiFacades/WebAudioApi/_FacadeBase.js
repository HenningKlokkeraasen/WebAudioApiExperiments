
/*


	Web Audio API wrapper - base


*/




function FacadeBase() {








	return this;
};

FacadeBase.prototype.connect = function(destination) {
	this.node.connect(destination);
	return this;
};

FacadeBase.prototype.disconnect = function() {
	this.node.disconnect(0); // disconnects to all destinations (?)
    return this;
};

function FacadeBase2(audioContext) {
	this.audioContext = audioContext;

	this.initNodes();
    this.setDefaultValues();
	this.wireUp();

	// backwards compatability
	this.node = this.input; // TODO verify
	
	return this;
};

FacadeBase2.prototype.connect = function(destination) {
	this.output.connect(destination);
	return this;
};

FacadeBase2.prototype.disconnect = function() {
	this.output.disconnect(0); // disconnects to all destinations (?)
    return this;
};
/*
FacadeBase2.prototype.input = undefined;

FacadeBase2.prototype.output = undefined;

FacadeBase2.prototype.initNodes = function() { };
FacadeBase2.prototype.setDefaultValues = function() { };
FacadeBase2.prototype.wireUp = function() { };
*/
