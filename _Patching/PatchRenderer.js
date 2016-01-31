define([
	'/_Patching/Patcher.js'
	], function (Patcher) {
		function PatchRenderer() {
			
		}
		
		PatchRenderer.prototype.renderPatches = function(rm, patches) {
			var self = this;
			
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
						patcher,
						type);
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
		PatchRenderer.prototype.getCoordinates = function(firstSelector, secondSelector) {
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
		
		return PatchRenderer;
});