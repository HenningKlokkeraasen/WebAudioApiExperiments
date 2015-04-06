/*
	Web Audio API wrapper - audio file player
*/
define([
	'/_studio/Modules/_FacadeBase.js'
 	], function(FacadeBase) {
		AudioFilePlayerFacade.prototype = Object.create(FacadeBase.prototype); //new FacadeBase();
		AudioFilePlayerFacade.prototype.constructor = AudioFilePlayerFacade;

		function AudioFilePlayerFacade(audioContext, buffers) {
			FacadeBase.call(this, audioContext); // base()
			this.buffers = buffers;
			return this;
		}

		// private
		AudioFilePlayerFacade.prototype.initNodes = function() {
		    this.input = this.audioContext.createGain();
		    this.output = this.input; // TODO verify



		};

		// private
		AudioFilePlayerFacade.prototype.setDefaultValues = function() {
			this._loop = false;


		};

		// private
		AudioFilePlayerFacade.prototype.wireUp = function() {






		};

		AudioFilePlayerFacade.prototype.playSound = function(originalUrl) {
			return this.privatePlaySound(originalUrl);
		}

		AudioFilePlayerFacade.prototype.playSoundTimed = function(originalUrl, time) {
			return this.privatePlaySound(originalUrl, false, time);
		}

		AudioFilePlayerFacade.prototype.playSoundLooped = function(originalUrl) {
			return this.privatePlaySound(originalUrl, true);
		}

		AudioFilePlayerFacade.prototype.privatePlaySound = function(originalUrl, loop, time) {
			var source = this.audioContext.createBufferSource();
			source.buffer = this.buffers[originalUrl];

			source.connect(this.input);

			// Play
			if (!time)
				time = 0;

			source.start(time);

			if (loop)
				source.loop = true;

		  	// console.debug('Started playing from buffer at time ' +  time + ', loop=' + loop + ' originalUrl ' + originalUrl);

		  	return source;
		}

        AudioFilePlayerFacade.prototype.setLoop = function(value) {
            // special case if value instead of checked property is sent
            if (value == 'on')
                value = false;

            // console.debug('will loop? ' + value);
            this._loop = value;
            return this;
        };

        AudioFilePlayerFacade.prototype.isLooping = function() {
        	return this._loop;
        };

		AudioFilePlayerFacade.prototype.stopPlaying = function(source) {
			source.stop();
			return source;
		}

		return AudioFilePlayerFacade;
 	}
 );
