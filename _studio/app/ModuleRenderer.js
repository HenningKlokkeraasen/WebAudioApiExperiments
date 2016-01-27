define([
	], function() {
		function ModuleRenderer(master, patcher) {
			this.master = master;
            this.patcher = patcher;
		}

		ModuleRenderer.prototype.renderModules = function(rackData) {
			var moduleTopContainerElem = document.querySelector('#moduleTopContainer');
			this.cellCounter = 0;

			var self = this;

			// Gear
			if (rackData.gear != undefined) {
				var gearCounter = 0;
				rackData.gear.forEach(function(gear) {
					var rowId = 'gearRow' + gearCounter++;
					var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer, rowId);

					var gearController = new GearController();
					var definition = { handlebarsTemplateSelector : '#gearTemplate' };
					var models = [ { gearName : gear.gearName } ];
					
					gearController.render(definition, models, '#' + rowElem.id);

					var moduleContainer = rowElem.querySelector('div.moduleContainer');

					// Modules
					gear.moduleCollections.forEach(function(moduleData) {
						moduleData.modules.forEach(function(module) {
							self.renderCellAndModule(module, moduleContainer, moduleData);
						});
					});
				});
			}

			// Rows
			rackData.rows.forEach(function(row) {
				var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer);

				// Modules
				row.moduleCollections.forEach(function(moduleData) {
					moduleData.modules.forEach(function(module) {
						self.renderCellAndModule(module, rowElem, moduleData);
					});
				});
			});
		};

		ModuleRenderer.prototype.renderCellAndModule = function(module, moduleContainer, moduleData) {
			var cellElem = document.createElement('div');
			cellElem.id = 'moduleCell' + this.cellCounter++;
			moduleContainer.appendChild(cellElem);

			// HTML will be generated by Handlebars in controller.render
			var containerSelector = '#' + cellElem.id;

			var modules = [];

			// Create instance of the factory specified
			var factory = new moduleData.factory();

			// Create a module instance with the moduleData
			modules.push(factory.getModule(module));

			// Create instance of the controller specified
			var controller = new moduleData.controller(this.master, this.patcher);

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector);
		};

		ModuleRenderer.prototype.createRowElemAndAddToContainer = function(moduleTopContainerElem, id) {
			var rowElem = document.createElement('div');
			rowElem.className = 'moduleRow';
			if (id)
				rowElem.id = id;
			moduleTopContainerElem.appendChild(rowElem);
			return rowElem;
		};

		return ModuleRenderer;
	}
);