
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
