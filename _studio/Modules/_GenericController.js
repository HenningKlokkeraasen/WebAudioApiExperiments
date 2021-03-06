define([
	'/_studio/app/_TemplateLoader.js',
	], function(TemplateLoader) {
		function GenericController(master, patcher, audioPatchController, triggerPatchController, 
			modulationPatchController, frequencyPatchController, facadeHolder) {
			this.master = master;
			this.patcher = patcher;
			this.facadeHolder = facadeHolder;

			this.audioPatchController = audioPatchController;
			this.triggerPatchController = triggerPatchController;
			this.modulationPatchController = modulationPatchController;
			this.frequencyPatchController = frequencyPatchController;
		}

		GenericController.prototype = {
			dataContainerSelector: 'span[class="dataContainer"]', // TODO use data- instead of class to identify
			facadeDataAttr: 'facade',
			audioInSelector: 'span[data-patch-type="audioIn"]',
			audioOutSelector: 'span[data-patch-type="audioOut"]',
			triggerInSelector: 'span[data-patch-type="triggerIn"]',
			triggerOutSelector: 'span[data-patch-type="triggerOut"]',
			modulateInSelector: 'span[data-patch-type="modulateIn"]',
			modulateOutSelector: 'span[data-patch-type="modulateOut"]',
			frequencyInSelector: 'span[data-patch-type="frequencyIn"]',
			frequencyOutSelector: 'span[data-patch-type="frequencyOut"]'
		};

		GenericController.prototype.render = function(definition, model, containerSelector, callback) {
			var controller = this;

			var foundElementsCount = $(containerSelector).length;
			if (foundElementsCount < 1)
				console.error('Could not find element with selector ' + containerSelector);
			if (foundElementsCount > 1)
				console.warn('More than one element with selector ' + containerSelector);
				
			var renderedModules = new Array();

			new TemplateLoader().loadTemplateWithHandlebars(containerSelector, definition.handlebarsTemplateSelector, model, function() {
				// callback
				////console.log("templates for " + containerSelector + " loaded");
				
				// Go through each of the modules in the container
				$(containerSelector + '>div').each(function() {
					var div = this;
					
					var dataContainer = controller.findTheDataContainer(div);
					
					var facadeInstance = controller.createFacadeInstance(definition.facade, controller.master.audioContext);
					controller.facadeInstance = facadeInstance;
					
					controller.storeFacadeInDom(facadeInstance, dataContainer);

					controller.initEachParameter(facadeInstance, definition.parameters, dataContainer);
					
					controller.setupPatching.call(controller, div, facadeInstance);

					controller.bindControlsToParameters(div, definition.parameters);

					renderedModules.push(
						{
							containerSelector : containerSelector,
							facadeInstance: facadeInstance,
							module : model[0] // TODO why is this input an array when it is only 1 element
						}
					);
				});
				
				callback(renderedModules);
			});
		};

		GenericController.prototype.findTheDataContainer = function(div) {
			var dataContainerSelector = GenericController.prototype.dataContainerSelector;
			return $(div).find(dataContainerSelector).first();
		};

		GenericController.prototype.findTheFacade = function(div) {
			var dataContainer = GenericController.prototype.findTheDataContainer(div);
			var facadeDataAttr = GenericController.prototype.facadeDataAttr;
			var facade = $(dataContainer).data(facadeDataAttr);
			var index = $(dataContainer).data(facadeDataAttr);
			var facade = this.facadeHolder[index];
			return facade;
		};

		GenericController.prototype.createFacadeInstance = function(facade, audioContext) {
			// create an instance of the facade
			var facadeInstance = new facade(audioContext);
			
			return facadeInstance;
		};

		GenericController.prototype.storeFacadeInDom = function(facadeInstance, dataContainer) {
			var facadeDataAttr = GenericController.prototype.facadeDataAttr;
			if (this.facadeHolder.indexOf(facadeInstance) < 0)
				this.facadeHolder.push(facadeInstance);
			$(dataContainer).data(facadeDataAttr, this.facadeHolder.indexOf(facadeInstance));
		};

		GenericController.prototype.initEachParameter = function(facadeInstance, parameters, dataContainer) {
			$.each(parameters, function(key, parameter) {
				//console.log($(dataContainer).siblings('fieldset').children('div').children(parameter.selector).val());
				
				// var elements = $(dataContainer).siblings('fieldset').children('div').children(parameter.selector);
				var elements = $(dataContainer).parent().find(parameter.selector);

				var parameterValue;
				if (elements.length > 1) {
					// Radio button list: find checked
					if (elements[0].type = 'radio') {
						$.each(elements, function(key, element) {
							//console.log($(element).attr('checked'));
							if ($(element).attr('checked')) {
								//console.log($(element).val());
								parameterValue = $(element).val();
							}
						});
					}
					else {
						console.warn('more than one element with selector ' + parameter.selector + ', and is not radio button list.');
					}
				}
				else {
					parameterValue = $(elements[0]).val();
				}

				//console.log(parameter.selector + ' ' + parameterValue);
				// call the function, ensure the facade is this in the context
				if (parameterValue != undefined && parameter.func != undefined && !parameter.doNotInitOnRender)
					parameter.func.call(facadeInstance, parameterValue, parameter.additionalParameters);
			});
		};

		GenericController.prototype.setupPatching = function(div, facade) {
			// console.log(this);
			var dataContainerSelector = this.dataContainerSelector;
			// var facadeDataAttr = this.facadeDataAttr;
			// console.debug(facade);

			this.audioPatchController.setupPatching(div, this.audioInSelector, this.audioOutSelector, dataContainerSelector, facade, facade.input, facade.output, facade.connectOrDisconnect, this.patcher);
			this.triggerPatchController.setupPatching(div, this.triggerInSelector, this.triggerOutSelector, dataContainerSelector, facade, facade, facade, facade.setTriggerFor, this.patcher);
			this.modulationPatchController.setupPatching(div, this.modulateInSelector, this.modulateOutSelector, dataContainerSelector, facade, facade.modulateIn, facade.modulateOut, facade.modulate, this.patcher);
			this.frequencyPatchController.setupPatching(div, this.frequencyInSelector, this.frequencyOutSelector, dataContainerSelector, facade, facade.frequencyIn, facade.frequencyOut, facade.setFrequencyFor, this.patcher);
		};

		GenericController.prototype.bindControlsToParameters = function(div, parameters) {
			var dataContainerSelector = GenericController.prototype.dataContainerSelector;
			var facadeDataAttr = GenericController.prototype.facadeDataAttr;

			var controller = this;

			// user controls - go through each parameter
			$.each(parameters, function(key, parameter) {
				// find the element by the selector 
				$(div).find(parameter.selector).each(function() {
					var element = this;
					// bind to the specified event
					// bind to onInput to get mouseMove event (continous),
					// bind to onChange to get mouseOut event
					$(this).bind(parameter.ev,  function() {
						// find the facade
						// var index = $(element).parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);
						var index = $(element).parents('.module').children(dataContainerSelector).data(facadeDataAttr);
						var facadeInstance = controller.facadeHolder[index];
						var value = element.value;
						controller.callFacadeAndUpdateOutput(element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance);
					});
				});
			});
		};

		GenericController.prototype.callFacadeAndUpdateOutput = function(
			element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance) {
			var formattedValue = Math.round(element.value * 100) / 100
			
			// special case for checkboxes
			if ($(element).attr('type') == 'checkbox') {
				value = element.checked;
			}

			// call the function with the value of the element
			// ensure the facade is this in the context
			parameter.func.call(facadeInstance, value, parameter.additionalParameters);

			// also, update the output
			if (element.name)
				$('output[for=' + element.name + ']').text(formattedValue);
			// for webaudio-controls, name is undefined, but id is not
			else if (element.id)
				$('output[for=' + element.id + ']').text(formattedValue);
			
			// On/off buttons - assumes too much TODO fix
			if (parameter.ev === 'click')
				if ($(element).data('on') === 'true'){
					$(element).data('on', 'false')
					$(element).text(parameter.textWhenOff);
				} else {
					$(element).data('on', 'true')
					$(element).text(parameter.textWhenOn);
				}

			$(element).attr('title', value);
		};

		return GenericController;
	}
);