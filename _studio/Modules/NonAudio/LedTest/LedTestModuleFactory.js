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
					{
						leds: [
							{color: 'white', label: 'LED' },
							{color: 'green', label: 'On' },
							{color: 'yellow', label: 'Medium' },
							{color: 'red', label: 'Off' },
							{color: 'blue', label: 'Cool' },
							{color: 'green', label: 'Slow', blinkrate: 2 },
							{color: 'yellow', label: 'Warning', blinkrate: 0.5 },
							{color: 'red', label: 'LFO Rate', blinkrate: 0.1 },
							{color: 'blue', label: 'Very Slow', blinkrate: 4 },
							{color: 'white', label: 'Clock', blinkrate: 1 },
						]
					}
				]
			});
			return module;
		};

        return LedTestModuleFactory;
    }
);