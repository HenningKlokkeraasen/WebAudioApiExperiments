define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/MediaStream/MediaStreamFacade.js',
    ], function(ModuleFactoryBase, MediaStreamFacade) {
		MediaStreamModuleFactory.prototype = new ModuleFactoryBase();
		MediaStreamModuleFactory.prototype.constructor = MediaStreamModuleFactory;

		function MediaStreamModuleFactory() {
			this.headerCssClass = 'mediastreammodule';
			this.moduleCssClass = 'module-1hp';
			this.hasAudioIn = false;
		}

		MediaStreamModuleFactory.prototype.getModuleDefinition = function() {
			return {
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : MediaStreamFacade,
				parameters : [
					this.getStartStopButtonParameter(MediaStreamFacade.prototype.toggleStartStop, ' ', ' ')
				]
			};
		};

		MediaStreamModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
				sections : [ {
		        	buttons: [
		        		this.getStartStopButtonControl(moduleData.shortName, 'Capture')
		        	]
		        }]
			});
		};

        return MediaStreamModuleFactory;
    }
);