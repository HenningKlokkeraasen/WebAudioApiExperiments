/*
	PatchBay
*/
define([
	'/_studio/Modules/_FacadeBase.js',
	'/_studio/Modules/_Mixins/ICanBeTriggered.js',
	// '/_studio/Modules/_Mixins/ICanBeAudioParamControlled.js'
	], function(FacadeBase, ICanBeTriggered
	// , ICanBeAudioParamControlled
	) {
		PatchBay.prototype = Object.create(FacadeBase.prototype);
		PatchBay.prototype.constructor = PatchBay;

		function PatchBay(audioContext) {
		    FacadeBase.call(this, audioContext); // base()
			ICanBeTriggered.call(this);
			// ICanBeAudioParamControlled.call(this);

			return this;
		}

		// private
		PatchBay.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.audioContext.createGain();
			// this.controlIn = this.input.gain;

		};

		// private
		PatchBay.prototype.setDefaultValues = function() {



		};

		// private
		PatchBay.prototype.wireUp = function() {
			this.input.connect(this.output);





		};

		// PatchBay.prototype.setGain = function(value) {
		// 	this.input.gain.value = value;
		// 	// this.output.gain.value = value;
		// 	return this;
		// };

		//region iCanBeTriggered
		PatchBay.prototype.gateOn = function(callback, originator) {
			// console.debug('output.gain.value before is ' + this.output.gain.value);
			// this.output.gain.value = 1;
			// console.debug('output.gain.value after is ' + this.output.gain.value);
			// console.debug('in GainFacade.gateOn, callback is ');
			// console.debug(callback);
			callback.call(originator, this.output.gain, 1, 0.0001);
		};

		PatchBay.prototype.gateOff = function(callback, originator) {
			// console.debug('output.gain.value before is ' + this.output.gain.value);
			// this.output.gain.value = 0;
			// console.debug('output.gain.value after is ' + this.output.gain.value);
			// console.debug('in GainFacade.gateOff, callback is ');
			// console.debug(callback);
			callback.call(originator, this.output.gain, 0.0001);
		};
		//endregion iCanBeTriggered

		return PatchBay;
	}
);