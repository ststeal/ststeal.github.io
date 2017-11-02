function extend(obj1, obj2) {
	var obj3 = {};
	for (var key in obj1) {
		obj3[key] = obj1[key];
	}
	for (key in obj2) {
		obj3[key] = obj2[key];
	}
	return obj3;
}

function callParent(func, self, opts) {
	if (!func) {
		return;
	}
	var parent = func.super && func.super.constructor;
	callParent(parent, self, opts);
	func.prototype.$constructor.call(self, opts);
}

function decl(baseClass, props) {
	if (!props) {
		props = baseClass;
		baseClass = null;
	}
	var constructor = function (opts) {
		if (!opts) {
			opts = {};
		}
		opts = extend(props.getDefaultOptions(), opts);
		var func = constructor.super && constructor.super.constructor;
		callParent(func, this, opts);
		props.$constructor.call(this, opts);
	};
	//constructor.prototype
	if (baseClass) {
		constructor.super = baseClass.prototype;
		constructor.prototype = Object.create(baseClass.prototype);
		constructor.prototype.constructor = constructor;
	}
	if (!props.getDefaultOptions) {
		props.getDefaultOptions = baseClass ? baseClass.prototype.getDefaultOptions : function () {
			return {};
		};
	}
	for (var key in props) {
		constructor.prototype[key] = props[key];
	}
	return constructor;
}

/**
 * @class Car
 */
var Car = decl({
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.model = opts.model;
		this.power = opts.power;
	},
	getDefaultOptions: function () {
		return {
			model: 'unknown',
			power: 100
		};
	},
	beep: function () {
		console.log('Beep! ', this.model);
	},
	clean: function () {
		this.power += 10;
	}
});

/**
 * @class Track
 * @extends Car
 */
var Track = decl(Car, {
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		//Car.prototype.$constructor.apply(this, arguments);
		this.carrying = opts.carrying;
		this.weight = 0;
	},
	getDefaultOptions: function () {
		return extend(Track.super.getDefaultOptions(), {
			carrying: 50
		});
	},
	/**
	 *
	 * @param {number} mass
	 */
	load: function (mass) {
		if (this.weight + mass <= this.carrying) {
			this.weight += mass;
		}
	},
	/**
	 *
	 * @param {number} mass
	 */
	unload: function (mass) {
		if (this.weight - mass >= 0) {
			this.weight -= mass;
		}
	},
	getWeight: function () {
		return this.weight;
	},
	beep: function () {
		Track.super.beep.apply(this, arguments);
		console.log('BEEEEEEEP!');
	}
});

/**
 * @class Monster
 * @extends Track
 */
var SuperTrack = decl(Track, {
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.creationTime = new Date();
	}
});

var lada = new Car();
lada.beep();
var volga = new Car({model: '121'});
volga.clean();
var oka = new Car({model: 'mini', power: 20});
oka.beep();
var skania = new Track({model: 'storm', carrying: 100});
skania.beep();
skania.load(14);
skania.unload(110);
console.log(skania.getWeight());
var monster = new SuperTrack();
monster.beep();
console.log(monster);
