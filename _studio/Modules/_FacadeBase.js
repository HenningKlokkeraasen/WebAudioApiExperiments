/*
	Web Audio API wrapper - base
*/
define([
	'/_studio/Modules/_Mixins/IHaveAudioIn.js',	// TODO move to each class instead
	'/_studio/Modules/_Mixins/IHaveAudioOut.js'	// TODO move to each class instead
	], function(IHaveAudioIn, IHaveAudioOut) {
		function FacadeBase(audioContext) {
			this.audioContext = audioContext;

			IHaveAudioIn.call(this);
			IHaveAudioOut.call(this);

			this.initNodes();
		    this.setDefaultValues();
			this.wireUp();

			return this;
		};


		/*
		FacadeBase.prototype.initNodes = function() { };
		FacadeBase.prototype.setDefaultValues = function() { };
		FacadeBase.prototype.wireUp = function() { };
		*/

		return FacadeBase;
	}
);
