function callParent(func, self, opts) {
	if (!func) {
		return;
	}
	var _parent = func.super && func.super.constructor;
	callParent(_parent, self, opts);
	func.prototype.$constructor.call(self, opts);
}

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
		var _func = constructor.super && constructor.super.constructor;
		callParent(_func, this, opts);
		props.$constructor.call(this, opts);
	};
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

var mylib = {};
/**
 * @class Canvas
 */
mylib.Canvas = decl({
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.id = opts.id;
		this.shapeList = [];
	},
	getDefaultOptions: function () {
		return {
			id: '1'
		};
	},
	/**
	 * @param {...Shape}
	 */
	addShape: function () {
		for (var i = 0; i < arguments.length; i++) {
			this.shapeList.push(arguments[i]);
		}
	},
	popShapeList: function () {
		this.shapeList.pop();
	},
	resetShapeList: function () {
		this.shapeList = [];
	},
	clearCanvas: function () {
		this.context.clearRect(0, 0, this.context.width, this.context.height);
	},
	render: function () {
		this.context = (document.getElementById(this.id)).getContext('2d');
		for (var i = 0; i < this.shapeList.length; i++) {
			this.shapeList[i].render(this.context);
		}
	},
	shapes: function () {
		for (var i = 0; i < this.shapeList.length; i++) {
			console.log(this.shapeList[i]);
		}
	}
});
/**
 * @class Shape
 */
mylib.Shape = decl({
	$constructor: function () {
	},
	render: function () {
		console.log('render method');
	},
	toString: function () {
		console.log('toString method');
	}
});
/**
 * @class Rect
 */
mylib.Rect = decl(mylib.Shape,{
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.color = opts.color;
		this.x = opts.x;
		this.y = opts.y;
		this.width = opts.width;
		this.height = opts.height;
	},
	getDefaultOptions: function () {
		return {
			color: 'green',
			x: 0,
			y: 0,
			width: 50,
			height: 50
		};
	},
	/**
	 *
	 * @param {Object} context
	 */
	render: function (context) {
		//mylib.Shape.super.render.apply(this, arguments);
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
});
/**
 * @class Circle
 */
mylib.Circle = decl({
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.cx = opts.cx;
		this.cy = opts.cy;
		this.r = opts.r;
		this.color = opts.color;
	},
	getDefaultOptions: function () {
		return {
			cx: 50,
			cy: 50,
			r: 50,
			color: 'red'
		};
	},
	/**
	 *
	 * @param {Object} context
	 */
	render: function (context) {
		//mylib.Shape.super.render.apply(this, arguments);
		context.beginPath();
		context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
		context.lineWidth = 5;
		context.strokeStyle = this.color;
		context.stroke();
	}
});
/**
 * @class LabeledCircle
 * @extends Circle
 */
mylib.LabeledCircle = decl(mylib.Circle, {
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.cx = opts.cx;
		this.cy = opts.cy;
		this.r = opts.r;
		this.text = opts.text;
		this.textColor = opts.textColor;
		this.color = opts.color;
	},
	getDefaultOptions: function () {
		return {
			cx: 50,
			cy: 50,
			r: 25,
			text: 'Unnamed Circle',
			textColor: 'pink',
			color: 'yellow'
		};
	},
	/**
	 *
	 * @param {Object} context
	 */
	render: function (context) {
		mylib.LabeledCircle.super.render.apply(this, arguments);
		context.fillStyle = this.textColor;
		context.textAlign = 'center';
		context.fillText(this.text, this.cx, this.cy);
	}
});
