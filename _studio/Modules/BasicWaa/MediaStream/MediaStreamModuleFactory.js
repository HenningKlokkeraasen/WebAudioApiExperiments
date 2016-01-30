define([
    '/_studio/Modules/_ModuleFactoryBase.js',
    '/_studio/Modules/BasicWaa/MediaStream/MediaStreamFacade.js',
    ], function(ModuleFactoryBase, MediaStreamFacade) {
        //////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		MediaStreamModuleFactory.prototype = new ModuleFactoryBase();
		MediaStreamModuleFactory.prototype.constructor = MediaStreamModuleFactory;

		function MediaStreamModuleFactory() {
			this.moduleCssClass = 'mediastreammodule';
			this.hasAudioIn = false;
			this.hasStartButton = true;
		}
		MediaStreamModuleFactory.prototype.getModuleDefinition = function() {
			return {
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : MediaStreamFacade,
				parameters : [

					
					



				]
			};
		};
		// moduleData
		// 		name
		// 		
		//
		//
		//
		//
		//
		// 		
		//		
		MediaStreamModuleFactory.prototype.getModule = function(moduleData) {
			return this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,











			});
		};
        //////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
        return MediaStreamModuleFactory;
    }
);