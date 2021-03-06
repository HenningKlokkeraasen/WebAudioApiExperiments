define([
	'Patching/PatchRenderer'
	], function(PatchRenderer) {
		function ModuleRenderer(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController) {
			this.master = master;
            this.patcher = patcher;
			this.audioPatchController = audioPatchController;
			this.triggerPatchController = triggerPatchController;
			this.modulationPatchController = modulationPatchController;
			this.frequencyPatchController = frequencyPatchController;
			this.facadeHolder = new Array();
			this.renderedModules = new Array();
			this.modulesToLoadCount = 0;
			this.modulesLoadedCount = 0;
		}

		ModuleRenderer.prototype.renderModules = function(rackData) {
			var moduleTopContainerElem = document.querySelector('#moduleTopContainer');
			this.cellCounter = 0;
			this.rackData = rackData;
			
			this.modulesToLoadCount = this.countTheNumberOfModulesToLoadV2(rackData);
			
			this.renderRacks(rackData, moduleTopContainerElem);
		};
		
		ModuleRenderer.prototype.renderRacks = function(rackData, moduleTopContainer) {
			var self = this;
			rackData.rows.forEach(function(row) {
				var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer);
				self.renderGearInRow(row, rowElem);
				self.renderModulesInRow(row, rowElem);
			});
		}
		
		ModuleRenderer.prototype.renderGearInRow = function(row, rowElem) {
			var self = this;
			if (row.gear != undefined) {
				row.gear.forEach(function(gear) {
					var gearElem = self.createGearElemAndAddToContainer(rowElem);
					// console.log(gear);
					self.createTitleAndAddToContainer(gear, gearElem);
					self.renderRacks(gear.rackData, gearElem);
				});
			}
		}
		
		ModuleRenderer.prototype.renderModulesInRow = function(row, rowElem) {
			var self = this;
			if (row.modules != undefined) {
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
			}
		}
		
		ModuleRenderer.prototype.continueAfterAllModulesAreRendered = function(renderedModules) {
			var rackData = this.rackData;
			var pacthRenderer = new PatchRenderer(this.audioPatchController, this.triggerPatchController, 
				this.modulationPatchController, this.frequencyPatchController);
			var rm = this.renderedModules;
			renderedModules.forEach(function(renderedModule, index, arr) {
				rm.push(renderedModule);
			});
			this.modulesLoadedCount += renderedModules.length;
			if (this.modulesLoadedCount === this.modulesToLoadCount) {
				if (rackData.patches != undefined)
					pacthRenderer.renderPatches(rm, rackData.patches);
				if (rackData.rows != undefined) {
					rackData.rows.forEach(function(row) {
						if (row.gear != undefined) {
							row.gear.forEach(function(gear) {
								pacthRenderer.renderPatches(rm, gear.rackData.patches);
								if (rackData.gearToModulePatches != undefined) {
									rackData.gearToModulePatches.forEach(function(gearPatch) {
										if (gearPatch.gear == gear.id) {
											pacthRenderer.renderPatches(rm, [gearPatch]);
										}
									});
								}
								if (rackData.moduleToGearPatches != undefined) {
									rackData.moduleToGearPatches.forEach(function(gearPatch) {
										if (gearPatch.gear == gear.id) {
											pacthRenderer.renderPatches(rm, [gearPatch]);
										}
									});
								}
								if (rackData.gearToGearPatches != undefined) {
									rackData.gearToGearPatches.forEach(function(gearPatch) {
										rackData.rows.forEach(function(row2) {
											if (row.gear != undefined) {
												row.gear.forEach(function(gear2) {
													if (gearPatch.fromGear == gear.id && gearPatch.toGear == gear2.id) {
														pacthRenderer.renderPatches(rm, [gearPatch]);
													}
												});
											}
										});
									});
								}
							});
						}
					});
				}
			}
		}
		
		ModuleRenderer.prototype.countTheNumberOfModulesToLoadV2 = function(rackData) {
			var moduleCount = 0;
			var self = this;
			rackData.rows.forEach(function(row) {
				if (row.modules != undefined)
					moduleCount += row.modules.length;
				if (row.gear != undefined)
					row.gear.forEach(function(gear) {
						moduleCount += self.countTheNumberOfModulesToLoadV2(gear.rackData);
					})
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
			var controller = new moduleData.moduleMother.Controller(this.master, this.patcher,
			this.audioPatchController, this.triggerPatchController, this.modulationPatchController, this.frequencyPatchController, 
			this.facadeHolder);

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector, callback);
		};
		
		ModuleRenderer.prototype.createRowElemAndAddToContainer = function(moduleTopContainerElem, id) {
			return this.createElemAndAddToContainer('moduleRow', moduleTopContainerElem, id);
		};
		
		ModuleRenderer.prototype.createGearElemAndAddToContainer = function(moduleTopContainerElem, id) {
			return this.createElemAndAddToContainer('gear', moduleTopContainerElem, id);
		}
		
		ModuleRenderer.prototype.createElemAndAddToContainer = function(className, moduleTopContainerElem, id) {
			var rowElem = document.createElement('div');
			rowElem.className = className;
			if (id)
				rowElem.id = id;
			moduleTopContainerElem.appendChild(rowElem);
			return rowElem;
		}
		
		ModuleRenderer.prototype.createTitleAndAddToContainer = function(gear, parent) {
			var rowElem = document.createElement('div');
			rowElem.className = 'title';
			rowElem.innerText = gear.title;
			parent.appendChild(rowElem);
			return rowElem;
		}

		return ModuleRenderer;
	}
);