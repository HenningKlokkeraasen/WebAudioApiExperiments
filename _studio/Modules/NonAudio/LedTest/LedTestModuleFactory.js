define([
    '/_studio/Modules/_ModuleFactoryBase.js',
	'/_studio/Modules/NonAudio/LedTest/LedTestFacade.js'
    ], function(ModuleFactoryBase, LedTestFacade) {
		LedTestModuleFactory.prototype = new ModuleFactoryBase();
		LedTestModuleFactory.prototype.constructor = LedTestModuleFactory;

		function LedTestModuleFactory() {
			ModuleFactoryBase.call(this);
		}
		LedTestModuleFactory.prototype.getModuleDefinition = function() {
			return {	
				handlebarsTemplateSelector : this.handlebarsTemplateSelector,
				facade : LedTestFacade,
				parameters : [
				]
			};
		};
		
		LedTestModuleFactory.prototype.getModule = function(moduleData) {
			var module = this.getModuleBase({
				name : moduleData.name, 
				shortName : moduleData.shortName,
		        sections : [ 
				]
			});
			module.showAllLeds = true;
			return module;
		};

        return LedTestModuleFactory;
    }
);