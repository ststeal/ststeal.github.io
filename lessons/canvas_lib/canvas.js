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
 * @desc Класс содержит фигуры canvas и умеют их рисовать
 */
mylib.Canvas = decl({
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.id = opts.id;
		this.shapeList = [];
	},
	/**
	 * Возвращает базовые свойства canvas области
	 * @returns {{id: string}}
	 */
	getDefaultOptions: function () {
		return {
			id: '1'
		};
	},
	/**
	 * Добавляет фигуры в список текущего контекста
	 * @param {...Shape}
	 */
	addShape: function () {
		for (var i = 0; i < arguments.length; i++) {
			this.shapeList.push(arguments[i]);
		}
	},
	/**
	 * Возвращает и удаляет фигуру из списка
	 * @returns {Shape}
	 */
	popShapeList: function () {
		return this.shapeList.pop();
	},
	/**
	 * Очищает список фигур
	 */
	resetShapeList: function () {
		this.shapeList = [];
	},
	/**
	 * Очищает область canvas
	 */
	clearCanvas: function () {
		this.context.clearRect(0, 0, this.context.width, this.context.height);
	},
	/**
	 * Рисует добавленные фигуры из списка
	 */
	render: function () {
		this.context = (document.getElementById(this.id)).getContext('2d');
		//(document.getElementById('1')).width = (document.body).clientWidth/2;
		//(document.getElementById('1')).height = (document.body).clientHeight/2;
		//(document.getElementById('2')).width = (document.body).clientWidth/2;
		//(document.getElementById('2')).height = (document.body).clientHeight/2;
		//(document.getElementById('3')).width = (document.body).clientWidth/2;
		//(document.getElementById('3')).height = (document.body).clientHeight/2;
		//(document.getElementById('4')).width = (document.body).clientWidth/2;
		//(document.getElementById('4')).height = (document.body).clientHeight/2;
		for (var i = 0; i < this.shapeList.length; i++) {
			this.shapeList[i].render(this.context);
		}
	},
	/**
	 * Вывод фигур, добавленных в список
	 */
	shapes: function () {
		for (var i = 0; i < this.shapeList.length; i++) {
			console.log(this.shapeList[i]);
		}
	}
});
/**
 * @class Shape
 * @lends Shape
 * @alias mylib.Shape
 * Базовая фигура
 */
mylib.Shape = decl({
	$constructor: function () {
	},
	render: function (context) {
		console.log('render method');
	},
	toString: function () {
		console.log('toString method');
	}
});
/**
 * @class Rect
 * @extends Shape
 * @lends Rect
 * @alias mylib.Rect
 * Прямоугольная фигура
 *
 * @example
 * <code>
 *      var rect1 = new mylib.Rect({color: 'blue', x: 0, y: 50, width: 50, height: 50});
 * </code>
 */
mylib.Rect = decl(mylib.Shape, {
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
	/**
	 * Возвращает базовые свойтва прямоуголника
	 * @returns {{color: string, x: number, y: number, width: number, height: number}}
	 */
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
	 * Рисует прямоугольник
	 * @param {CanvasRenderingContext2D} context
	 */
	render: function (context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
});
/**
 * @class Circle
 * @extends Shape
 * @lends Circle
 * @alias mylib.Circle
 * Окружность
 *
 * @example
 * <code>
 *     var circle2 = new mylib.Circle({cx: 50, cy: 50, r: 40, color: 'blue'});
 * </code>
 */
mylib.Circle = decl(mylib.Shape, {
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
	/**
	 * Возвращает базовые свойтва окружности
	 * @returns {{cx: number, cy: number, r: number, color: string}}
	 */
	getDefaultOptions: function () {
		return {
			cx: 50,
			cy: 50,
			r: 50,
			color: 'red'
		};
	},
	/**
	 * Рисует окружность
	 * @param {CanvasRenderingContext2D} context
	 */
	render: function (context) {
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
 * @lends LabeledCircle
 * @alias mylib.labeledCircle
 * Окружность с заголовком
 *
 * @example
 * <code>
 *      var labeledCircle1 = new mylib.LabeledCircle({cx: 100, cy: 100, text: 'Первый', textColor: 'blue', color: 'red'});
 * </code>
 */
mylib.LabeledCircle = decl(mylib.Circle, {
	/**
	 * @constructor
	 * @param {Object} opts
	 */
	$constructor: function (opts) {
		this.text = opts.text;
		this.textColor = opts.textColor;
		this.color = opts.color;
	},
	/**
	 * Возвращает базовые свойства окружности с заголовком
	 * @returns {{cx: number, cy: number, r: number, text: string, textColor: string, color: string}}
	 */
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
	 * Рисует окружность с заголовком
	 * @param {CanvasRenderingContext2D} context
	 */
	render: function (context) {
		mylib.LabeledCircle.super.render.apply(this, arguments);
		context.fillStyle = this.textColor;
		context.textAlign = 'center';
		context.fillText(this.text, this.cx, this.cy);
	}
});

