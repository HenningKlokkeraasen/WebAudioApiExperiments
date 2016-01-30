define([
	], function() {
		function ModuleRenderer(master, patcher) {
			this.master = master;
            this.patcher = patcher;
			this.renderedModules = new Array();
			this.modulesToLoadCount = 0;
			this.modulesLoadedCount = 0;
		}

		ModuleRenderer.prototype.renderModules = function(rackData) {
			var moduleTopContainerElem = document.querySelector('#moduleTopContainer');
			this.cellCounter = 0;
			this.rackData = rackData;
			
			this.renderGear(rackData, moduleTopContainer);
			
			this.modulesToLoadCount = this.countTheNumberOfModulesToLoad(rackData);
			
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
		
		ModuleRenderer.prototype.renderRack = function(rackData, moduleTopContainer) {
			var self = this;
			rackData.rows.forEach(function(row) {
				var rowElem = self.createRowElemAndAddToContainer(moduleTopContainer);
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
				this.renderPatches(rm);
			}
		}
		
		ModuleRenderer.prototype.renderPatches = function(rm) {
			var self = this;
			
			var patches = this.rackData.patches;
			if (patches === undefined)
				return;
			
			// console.table(rm);
			
			var patcher = new Patcher();
			
			patches.forEach(function(patch) {
				// console.log(patch.from + ' - ' + patch.to);
				var from = undefined;
				var to = undefined; 
				rm.forEach(function(rm) {
					// console.log(rm.module.shortName);
					if (rm.module.shortName == patch.from)
						from = rm;
					if (rm.module.shortName == patch.to)
						to = rm;
				});
				
				if (from != undefined && to != undefined) {
					var type = patch.type;
					var input = type === 'audio'
						? to.facadeInstance.input
						: type === 'trigger'
							? to.facadeInstance
							: type === 'control'
								? to.facadeInstance.controlIn
								: undefined;
					var connectFunc = type === 'audio'
						? from.facadeInstance.connect
						: type === 'trigger'
							? from.facadeInstance.setTriggerFor
							: type === 'control'
								? from.facadeInstance.control
								: undefined;
					var fromCoordinates = self.getCoordinates(from.containerSelector, '[data-patch-type=' + type + 'Out]');
					var toCoordinates = self.getCoordinates(to.containerSelector, '[data-patch-type=' + type + 'In]');
					PatchController.prototype.patch(fromCoordinates, toCoordinates, 
						from.facadeInstance, 
						input, 
						connectFunc, 
						patcher);
				}
			});
			
			// console.log(patches);
			// here is some more stuff we can with patches, like starting oscillators and setting values
			// this.facades[0].connect(this.facades[1].input);
			// this.facades[1].connect(this.facades[2].input);
			// this.facades[2].connect(this.facades[6].input);
			// this.facades[0].start();
			// this.facades[0].setType('sawtooth');
			// this.facades[0].setFrequency(260);
			// this.facades[1].setFrequencyByAbsoluteValue(3000);
			// this.facades[1].setQuality(0.6);
			// this.facades[2].setGain(0.1);
			// var osc = this.facades[0];
			// setTimeout(function() {
			// 	osc.stop()
			// }, 2000);
			
			// rm.forEach(function(rm) {
			// 	console.log(rm.module.shortName);
			// });
		}
		
		// TODO move this function somewhere better
		ModuleRenderer.prototype.getCoordinates = function(firstSelector, secondSelector) {
			var element = $(firstSelector).find(secondSelector)[0];
			var rect = element.getBoundingClientRect();			
			// console.log(element);
			// console.log(rect.top, rect.right, rect.bottom, rect.left);
			// console.log(rect);
			var width = rect.right - rect.left;
			var height = rect.top - rect.bottom;
			var halfWidth = width / 2;
			var halfHeight = height / 2;
			var x = rect.left + halfWidth;
			var y = rect.bottom + halfHeight;
			return { x: x, y: y };
		}
				
		ModuleRenderer.prototype.countTheNumberOfModulesToLoad = function(rackData) {
			var moduleCount = 0;
			rackData.rows.forEach(function(row) {
				row.moduleCollections.forEach(function(moduleData) {
					moduleCount += moduleData.modules.length;
				});
			});
			return moduleCount;
		}

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
			var controller = new moduleData.controller(this.master, this.patcher);

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