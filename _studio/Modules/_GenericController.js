define([
	'/_thirdparty/knob.js',
	'/_studio/UiElements/Knobs/GreenKnob.js'
	], function(JimKnopf, GreenKnob) {
		//////////////////////////////////////////////////////    PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		function GenericController(master, patcher) {
			this.master = master;
			this.patcher = patcher;
		}

		GenericController.prototype.dataContainerSelector = 'span[class="dataContainer"]';
		GenericController.prototype.patchInputSelector ='span[class="patchHole patchInput"]';
		GenericController.prototype.patchOutputSelector = 'span[class="patchHole patchOutput"]';
		GenericController.prototype.facadeDataAttr = 'facade';

		GenericController.prototype.render = function(definition, model, containerSelector) {
			var controller = this;

			var foundElementsCount = $(containerSelector).length;
			if (foundElementsCount < 1)
				console.error('Could not find element with selector ' + containerSelector);
			if (foundElementsCount > 1)
				console.warn('More than one element with selector ' + containerSelector);

			TemplateLoader.prototype.loadTemplateWithHandlebars(containerSelector, definition.handlebarsTemplateSelector, model, function() {
				// callback
				////console.log("templates for " + containerSelector + " loaded");
				
				// Go through each of the modules in the container
				$(containerSelector + '>div').each(function() {
					var div = this;
					
					var dataContainer = controller.findTheDataContainer(div);
					
					if (definition.doNotCreateFacadeInstance)
						var facadeInstance = controller.master;
					else
						var facadeInstance = controller.createFacadeInstance(definition.facade, controller.master.audioContext);

					controller.storeFacadeInDom(facadeInstance, dataContainer);

					controller.initEachParameter(facadeInstance, definition.parameters, dataContainer);
					
					controller.setupPatching(div, controller.patcher);

					controller.bindControlsToParameters(div, definition.parameters);
				});
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
			return facade;
		};

		GenericController.prototype.createFacadeInstance = function(facade, audioContext) {
			// create an instance of the facade
			var facadeInstance = new facade(audioContext);
			
			return facadeInstance;
		};

		GenericController.prototype.storeFacadeInDom = function(facadeInstance, dataContainer) {
			var facadeDataAttr = GenericController.prototype.facadeDataAttr;
			
			$(dataContainer).data(facadeDataAttr, facadeInstance);
		};

		GenericController.prototype.initEachParameter = function(facadeInstance, parameters, dataContainer) {
			$.each(parameters, function(key, parameter) {
				//console.log($(dataContainer).siblings('fieldset').children('div').children(parameter.selector).val());
				
				var elements = $(dataContainer).siblings('fieldset').children('div').children(parameter.selector);

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
				if (parameterValue != undefined && parameter.func != undefined)
					parameter.func.call(facadeInstance, parameterValue);
			});
		};

		GenericController.prototype.setupPatching = function(div, patcher) {
			var patchInputSelector = GenericController.prototype.patchInputSelector;
			var patchOutputSelector = GenericController.prototype.patchOutputSelector;
			var dataContainerSelector = GenericController.prototype.dataContainerSelector;
			var facadeDataAttr = GenericController.prototype.facadeDataAttr;

			PatchController.prototype.setupPatching(div, patchInputSelector, patchOutputSelector, dataContainerSelector, facadeDataAttr, patcher);
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
						var facadeInstance = $(element).parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);

						var value = element.value;
						controller.callFacadeAndUpdateOutput(element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance);
					});

					// Convert input ranges to JimKnopf Knobs
					if ($(this).hasClass('knob')) {
						var knob = new JimKnopf.Knob(element, new GreenKnob(),
						function(value) {
							if (parameter.ev == 'change') {
								// find the facade
								var facadeInstance = $(element).parent().parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);

								controller.callFacadeAndUpdateOutput(element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance);
							}
						}, function(value) {
							if (parameter.ev == 'input') {
								// find the facade
								var facadeInstance = $(element).parent().parent().parent().siblings(dataContainerSelector).data(facadeDataAttr);
								
								controller.callFacadeAndUpdateOutput(element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance);
							}
						});
					}
				});
			});
		};

		GenericController.prototype.callFacadeAndUpdateOutput = function(element, value, dataContainerSelector, facadeDataAttr, parameter, facadeInstance) {
			// special case for checkboxes
			if ($(element).attr('type') == 'checkbox') {
				value = element.checked;
			}

			// call the function with the value of the element
			// ensure the facade is this in the context
			parameter.func.call(facadeInstance, value);

			// also, update the output
			if (element.name)
				$('output[for=' + element.name + ']').text(element.value);
			$(element).attr('title', element.value);
		};

		//////////////////////////////////////////////////////END PROTOTYPE DEFINITION //////////////////////////////////////////////////////
		return GenericController;
	}
);