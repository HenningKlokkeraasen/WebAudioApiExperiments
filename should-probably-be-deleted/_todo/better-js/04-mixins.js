
/*
 * General purpose extend()
 */

(function(window){
	'use strict';

	var __slice = [].slice;
	
	function extend () {
	    var consumer = arguments[0],
		providers = __slice.call(arguments, 1),
		key,
		i,
		provider;

		for (i = 0; i < providers.length; ++i) {
			provider = providers[i];
			for (key in provider) {
				if (provider.hasOwnProperty(key)) {
					consumer[key] = provider[key];
				};
			};
		};
		return consumer;
	};

	window.__extend = extend;
})(window);

/*
 * person behaviour
 */

(function(window){
	'use strict';

	var person = {
		fullName: function () {
			return this.firstName + ' ' + this.lastName;
		},
		rename: function (first, last) {
			this.firstName = first;
			this.lastName = last;
			return this;
		}
	};

	window.person = person;
})(window);

/*
 * hasCareer behaviour
 */

(function(window){
	'use strict';

	var hasCareer = {
		get career() {
			return this.chosenCareer;
		},
		set career(value) {
			this.chosenCareer = value;
		}
	};

	window.hasCareer = hasCareer;
})(window);

/*
 * state
 */

var peck = {
	firstName: 'Sam',
	lastName: 'Peckinpah'
};

/*
 * mixin
 */
 
__extend(peck, person);
__extend(peck, hasCareer);
peck.career = 'Director';

console.log(peck.fullName());
peck.rename('Clint', 'Eastwood');
console.log(peck.fullName());

console.log(peck.career);
peck.career = 'Actor';
console.log(peck.career);