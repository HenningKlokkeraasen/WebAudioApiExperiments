define([
	'/_Patching/PatchRenderer.js'
	], function(PatchRenderer) {
		function ModuleRenderer(master, patcher) {
			this.master = master;
            this.patcher = patcher;
			this.facadeHolder = new Array();
			this.renderedModules = new Array();
			this.modulesToLoadCount = 0;
			this.modulesLoadedCount = 0;
		}

		ModuleRenderer.prototype.renderModules = function(rackData) {
			var moduleTopContainerElem = document.querySelector('#moduleTopContainer');
			this.cellCounter = 0;
			this.rackData = rackData;
			
			this.renderGear(rackData, moduleTopContainer);
			
			this.modulesToLoadCount = this.countTheNumberOfModulesToLoadV2(rackData);
			
			// DEPRECATED TODO REMOVE WHEN ALL RACKS MOVED TO V2
			this.modulesToLoadCount += this.countTheNumberOfModulesToLoad(rackData);
			
			this.renderRackV2(rackData, moduleTopContainer);
			
			// DEPRECATED TODO REMOVE WHEN ALL RACKS MOVED TO V2
			this.renderRack(rackData, moduleTopContainer);
		};
		
		ModuleRenderer.prototype.renderGear = function(rackData, moduleTopContainer) {
			var self = this;
			// TODO is this used yet, does this work?
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
		}
		
		ModuleRenderer.prototype.renderRackV2 = function(rackData, moduleTopContainer) {
			var self = this;
			rackData.rows.forEach(function(row) {
				var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer);
				if (row.modules != undefined)
					row.modules.forEach(function(moduleData) {
						// var mother = moduleData.moduleMother;
						// var id = moduleData.id;
						// console.log(moduleData);
						// moduleData.modules.forEach(function(module) {
							self.renderCellAndModuleV2(rowElem, moduleData, function(renderedModules) {
								self.continueAfterAllModulesAreRendered(renderedModules);
							});
						// });
					});
			});
		}
		
		// DEPRECATED TODO REMOVE WHEN ALL RACKS MOVED TO V2
		ModuleRenderer.prototype.renderRack = function(rackData, moduleTopContainer) {
			var self = this;
			rackData.rows.forEach(function(row) {
				var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer);
				if (row.moduleCollections != undefined)
					row.moduleCollections.forEach(function(moduleData) {
						moduleData.modules.forEach(function(module) {
							self.renderCellAndModule(module, rowElem, moduleData, function(renderedModules) {
								self.continueAfterAllModulesAreRendered(renderedModules);
							});
						});
					});
			});
		}
		
		ModuleRenderer.prototype.continueAfterAllModulesAreRendered = function(renderedModules) {
			var rm = this.renderedModules;
			renderedModules.forEach(function(renderedModule, index, arr) {
				rm.push(renderedModule);
			});
			this.modulesLoadedCount += renderedModules.length;
			if (this.modulesLoadedCount === this.modulesToLoadCount) {
				new PatchRenderer().renderPatches(rm, this.rackData.patches);
			}
		}
		
		ModuleRenderer.prototype.countTheNumberOfModulesToLoadV2 = function(rackData) {
			var moduleCount = 0;
			rackData.rows.forEach(function(row) {
				if (row.modules != undefined)
					moduleCount += row.modules.length;
			});
			return moduleCount;
		}

		// DEPRECATED TODO REMOVE WHEN ALL RACKS MOVED TO V2
		ModuleRenderer.prototype.countTheNumberOfModulesToLoad = function(rackData) {
			var moduleCount = 0;
			rackData.rows.forEach(function(row) {
				if (row.moduleCollections != undefined)
					row.moduleCollections.forEach(function(moduleData) {
						moduleCount += moduleData.modules.length;
					});
			});
			return moduleCount;
		}

		ModuleRenderer.prototype.renderCellAndModuleV2 = function(moduleContainer, moduleData, callback) {
			var cellElem = document.createElement('div');
			cellElem.id = 'moduleCell' + this.cellCounter++;
			moduleContainer.appendChild(cellElem);

			// HTML will be generated by Handlebars in controller.render
			var containerSelector = '#' + cellElem.id;

			var modules = [];

			// Create instance of the factory specified
			var factory = new moduleData.moduleMother.ModuleFactory();

			// Create a module instance with the moduleData
			var module = moduleData.moduleMother.Modules.getItemsByShortName(moduleData.id)[0];
			// console.log(module);
			modules.push(factory.getModule(module));

			// Create instance of the controller specified
			var controller = new moduleData.moduleMother.Controller(this.master, this.patcher, this.facadeHolder);

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector, callback);
		};
		
		// DEPRECATED TODO REMOVE WHEN ALL RACKS MOVED TO V2
		ModuleRenderer.prototype.renderCellAndModule = function(module, moduleContainer, moduleData, callback) {
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
			var controller = new moduleData.controller(this.master, this.patcher, this.facadeHolder);

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector, callback);
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