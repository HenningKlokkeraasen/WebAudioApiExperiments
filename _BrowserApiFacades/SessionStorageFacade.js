/*
	Session Storage (Web Storage) wrapper
*/
define([
	], function() {
		function SessionStorageFacade() {
			if (window.sessionStorage) {
				this.sessionStorageIsAvailable = true;
			} else {
				this.sessionStorageIsAvailable = false;
			}
			this.dataStore = window.localStorage;
		}

		SessionStorageFacade.prototype.logDataToConsole = function() {
			var output = "LOCALSTORAGE DATA:\n------------------------------------\n";
			if (this.dataStore.length) {
				for (var i = 0; i < this.dataStore.length; i++) {
					output += this.dataStore.key(i) + ': ' + this.dataStore.getItem(this.dataStore.key(i)) + '\n';
				}
			} else {
				output += 'There is no data stored for this domain.';
			}
			console.log(output);
		}


		SessionStorageFacade.prototype.store = function(key, value) {
			// Store value on browser for duration of the session
			this.dataStore.setItem(key, value);

			// Store an object instead of a string
			//localStorage.setItem('key', {name: 'value'});
			//alert(typeof localStorage.getItem('key')); // string

			// Store an integer instead of a string
			//localStorage.setItem('key', 1);
			//alert(typeof localStorage.getItem('key')); // string
		};

		SessionStorageFacade.prototype.get = function(key) {
			// Retrieve value (gets deleted when browser is closed and re-opened)
			return this.dataStore.getItem(key);
		};

		SessionStorageFacade.prototype.storeJson = function(key, jsonObject) {
			// Store an object using JSON
			this.dataStore.setItem(key, JSON.stringify(jsonObject));
		};

		SessionStorageFacade.prototype.getJson = function(key) {
			return JSON.parse(this.dataStore.getItem(key));
		};

		return SessionStorageFacade;
	}
);