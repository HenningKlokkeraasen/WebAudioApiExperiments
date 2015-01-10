
/*


	App


*/


	// TODO STUFF NOT IN USE
	//
	// MASTER OUTPUT
	//
	//controller.render(mixerModuleDefinition, mixerModules);

	//
	// CUSTOM MODIFIERS
	//
	//controller.render(envelopeGeneratorModuleDefinition, envelopeGeneratorModules);


function App() {
	this.xhrFacade = undefined;
	this.sessionStorageFacade = undefined;
	this.master = undefined;
}

App.prototype.init = function() {
	console.log('starting');

	//
	// XHR
	//

	this.xhrFacade = new XhrFacade();
	if (!this.xhrFacade.XhrIsEnabled) {
		console.error('XMLHttpRequest is NOT available')
		return;
	}
	console.log('XMLHttpRequest is available');

	//
	// SESSION STORAGE (HTML5 WEB STORAGE)
	//

	this.sessionStorageFacade = new SessionStorageFacade();
	if (!this.sessionStorageFacade.sessionStorageIsAvailable) {
		console.error('Session storage is NOT available');
		return;
	}
	console.log('Session storage is available');
	
	//
	// AUDIO CONTEXT - ENTRY POINT OF WEB AUDIO API
	//

	this.master = new AudioContextFacade();
	if (!this.master.WebAudioApiIsEnabled) {
		console.error('Web Audio is NOT available');
		return;
	}
	console.log('Web Audio is available');
	//console.log(this.master.audioContext);

	//
	// LOAD THE BOARD
	//
	if (this.board.isAudioBufferPage)
		this.loadSoundFiles();
	else {
		if (this.board.shouldLoadImpulseBuffers) {
			var app = this;
			this.loadImpulseBuffers(function() { 
				app.continueLoading();
			});
		}
		else {
			this.continueLoading();
		}
	}
	// finished initializing, notify others
	//var isInitializedEvent = new CustomEvent('appIsInitialized', { detail : { instance : this } });
	//document.dispatchEvent(isInitializedEvent);
};

App.prototype.continueLoading = function() {
	this.loadModules();
	if (this.board.usesSynthAndKeyboard)
		this.initSynthAndKeyboard();
};

//
// App prototype
//
App.prototype.loadImpulseBuffers = function(callback) {
	console.log('load impulse buffers');

	//
	// BUFFERER - DOWNLOAD AND DECODE SOUND FILES
	//

	var bufferer = new BufferFacade(this.xhrFacade, this.master.audioContext);
	var sounds = [];
	var impulses = [
		'/audiofiles/impulses/FactoryHall/FactoryHall/FactoryHall.wav',
		'/audiofiles/impulses/FactoryHall/PaHornInHall/PaHornInHall.wav',
		'/audiofiles/impulses/ChurchSchellingwoude/ChurchSchellingwoude/Church.wav',
		'/audiofiles/impulses/ClaustrofobiaV1.1/Ironbath/Bath.wav',
		'/audiofiles/impulses/Speakersandtelephones/Smallportable/SmallPortable.wav'
		];
	var all = sounds.concat(impulses);

	var app = this;

	bufferer.bufferAudioFiles(all, 
		// callback
		function() {
			// Hold the buffers
			app.master.buffers = bufferer.buffers;
			delete bufferer;

			// carry on after all sounds are donwloaded and decoded
			callback();
	});
};

App.prototype.getImpulseOptions = function() {
	var impulseOptions = [];
	for(var key in this.master.buffers) {
		var s = key.split('/');
		var name = s[s.length - 1];
		impulseOptions.push( { value : key, name : name } );
	}
	return impulseOptions;
};

App.prototype.loadModules = function() {

	document.querySelector('#boardTitle').innerText = this.board.title;
	document.querySelector('#boardDescription').innerText = this.board.description;

	console.log('loading modules');

	this.initPatcher();
	
	var moduleDatas = this.board.moduleDatas;
	if (moduleDatas == undefined)
		console.error('No moduleDatas found');

	this.renderModules(moduleDatas);	

	this.initPatchCables();

	this.initFloatingLayouts();
};

App.prototype.renderModules = function(moduleDatas) {
	var moduleTopContainerElem = document.querySelector('#moduleTopContainer');
	var cellCounter = 0;

	var app = this;

	// Gear
	if (moduleDatas.gear != undefined) {

	var gearCounter = 0;
	moduleDatas.gear.forEach(function(gear) {
		var rowElem = document.createElement('div');
		rowElem.className = 'moduleRow';
		rowElem.id = 'gearRow' + gearCounter++;
		moduleTopContainerElem.appendChild(rowElem);

		var gearController = new GearController();
		var definition = { handlebarsTemplateSelector : '#gearTemplate' };
		var models = [ { gearName : gear.gearName } ];
		
		gearController.render(definition, models, '#' + rowElem.id);

		var moduleContainer = rowElem.querySelector('div.moduleContainer');

		// Modules
		gear.moduleCollections.forEach(function(moduleData) {
			var cellElem = document.createElement('div');
			cellElem.id = 'moduleCell' + cellCounter++;
			moduleContainer.appendChild(cellElem);

			// HTML will be generated by Handlebars in controller.render
			var containerSelector = '#' + cellElem.id;

			var modules = [];

			// Create instance of the factory specified
			var factory = new moduleData.factory();

			// Create a module instance with the moduleData
			moduleData.modules.forEach(function(module) {

				// Special case for Convolver modules
				// TODO: hacky, find a better way
				try {
					if (factory instanceof ConvolverModuleFactory)
						module.impulseOptions = app.getImpulseOptions();
				}
				catch (e) {
				   // reference error if ConvolverModuleFactory is not defined. ignored.
				}

				modules.push(factory.getModule(module));
			});

			// Create instance of the controller specified
			var controller = new moduleData.controller(app.master, app.patcher)

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector);
		});
	});
	}


	// Rows
	moduleDatas.rows.forEach(function(row) {
		var rowElem = document.createElement('div');
		rowElem.className = 'moduleRow';
		moduleTopContainerElem.appendChild(rowElem);

		// Modules
		row.moduleCollections.forEach(function(moduleData) {
			var cellElem = document.createElement('div');
			cellElem.id = 'moduleCell' + cellCounter++;
			rowElem.appendChild(cellElem);

			// HTML will be generated by Handlebars in controller.render
			var containerSelector = '#' + cellElem.id;

			var modules = [];

			// Create instance of the factory specified
			var factory = new moduleData.factory();

			// Create a module instance with the moduleData
			moduleData.modules.forEach(function(module) {

				// Special case for Convolver modules
				// TODO: hacky, find a better way
				try {
					if (factory instanceof ConvolverModuleFactory)
						module.impulseOptions = app.getImpulseOptions();
				}
				catch (e) {
				   // reference error if ConvolverModuleFactory is not defined. ignored.
				}

				modules.push(factory.getModule(module));
			});

			// Create instance of the controller specified
			var controller = new moduleData.controller(app.master, app.patcher)

			// render module
			controller.render(factory.getModuleDefinition(), modules, containerSelector);
		});
	});
};

App.prototype.initSynthAndKeyboard = function() {
	var synth = new Synthesizer(this.master.audioContext);
	new KeyboardController(synth);
	this.initKeysLegendFloatingLayout();
};

App.prototype.initPatchCables = function() {
	
	//
	// PATCH CABLES
	//

	//PatchCableController.prototype.hidePatchCables();
	$('#showPatchCablesCheckbox').bind('change', function() {
		if($(this).is(':checked')) {
			PatchCableController.prototype.showPatchCables();
		}
		else {
			PatchCableController.prototype.hidePatchCables();
		}
	});
};

App.prototype.initPatcher = function() {
	
	//
	// PATCHER (AUDIO GRAPH)
	//

	this.patcher = new Patcher();
};

App.prototype.initFloatingLayouts = function() {
	new LayoutController('.oscilloscopeCanvasContainer', '#oscilloscopeContainerFloating', '>canvas');
	new LayoutController('.freqSpectrumAnalyserCanvasContainer', '#freqAnalyserContainerFloating', '>canvas');
	//new LayoutController('#audioParamModifierContainer', '#audioParamModiferContainerFloating', '>div');
	new LayoutController('#legendContainer', '#legendContainerFloating', '>div');
	new LayoutController('#patchCableControlContainer', '#legendContainerFloating', '>div');
};

App.prototype.initKeysLegendFloatingLayout = function() {
	new LayoutController('#keysLegendContainer', '#legendContainerFloating', '>article');
};
