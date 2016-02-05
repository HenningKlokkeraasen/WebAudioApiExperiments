define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/NonAudio/BlankPanel/BlankPanelFacade.js'
    ], function(ModuleFactoryBase, BlankPanelFacade) {
		BlankPanelModuleFactory.prototype = new ModuleFactoryBase();
		BlankPanelModuleFactory.prototype.constructor = BlankPanelModuleFactory;

		function BlankPanelModuleFactory() {
			ModuleFactoryBase.call(this);
			this.hasAudioIn = false;
			this.hasAudioOut = false;
		}
		BlankPanelModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : BlankPanelFacade,
				parameters : [
				]
			};
		};
		
		BlankPanelModuleFactory.prototype.getModule = function(moduleData) {
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ 
				]
			});
			return module;
		};

        return BlankPanelModuleFactory;
    }
);