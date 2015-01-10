
/*


	Web Audio API wrapper - Convolver


*/

ConvolverFacade.prototype = new FacadeBase();
ConvolverFacade.prototype.constructor = ConvolverFacade;

function ConvolverFacade(audioContext, buffers) {
	this.node = audioContext.createConvolver();
	this.buffers = buffers;






	return this;
}

ConvolverFacade.prototype.setImpulse = function(bufferIndex) {
	// Set the impulse response buffer
	var impulseBuffer = this.buffers[bufferIndex];
	this.node.buffer = impulseBuffer;
	return this;
};
