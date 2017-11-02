//var head = {
//	glasses: 1
//};
//
//var table = {
//	pen: 3
//};
//
//var bed = {
//	sheet: 1,
//	pillow: 2
//};
//
//var pockets = {
//	money: 2000,
//	__proto__: bed
//};
//pockets.__proto__ = bed;
//bed.__proto__ = table;
//table.__proto__ = head;

function Calculator() {
	Calculator.prototype.read = function () {
		this.a = parseInt(prompt('a='), 10);
		this.b = parseInt(prompt('b='), 10);
	};
	Calculator.prototype.sum = function () {
		return this.a + this.b;
	};
	Calculator.prototype.mul = function () {
		return this.a * this.b;
	};
}


function Calculator() {
}
Calculator.prototype.read = function () {
	Calculator.a = parseInt(prompt('a='), 10);
	Calculator.b = parseInt(prompt('b='), 10);
};
Calculator.prototype.sum = function () {
	return Calculator.a + Calculator.b;
};
Calculator.prototype.mul = function () {
	return Calculator.a * Calculator.b;
};


function Accumulator(sum) {
	this.sum = sum;
	this.read = function () {
		return this.sum += parseInt(prompt('a='), 10);
	};
	this.value = function () {
		console.log(this.sum);
	};
}

for (var i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log(i);
	}, i * 500);
}


for (var i = 1; i < 10; ++i) {
	setOut(i);
}

function setOut(i) {
	setTimeout(function () {
		console.log(i);
	}, i * 500);
}


for (var i = 0; i < 10; i++) {
	(function (index) {
		setTimeout(function () {
			console.log(index);
		}, index * 500);
	})(i);
}

//for (var i = 0; i < 10; i++) {
//	var j = 0;
//	setTimeout(function () {
//		console.log(j);
//		j++;
//	}, i * 500);
//}

//(function name(n) {
//	console.log(n);
//	if (n < 9)setTimeout(function () {
//		name(++n);
//	}, 500 * i);
//}(0));


//(function name(n) {
//	console.log(n);
//	for (var i = n; i < 10; i++) {
//		setTimeout(function () {
//			name(++n);
//		}, 500 * i);
//	}
//}(0));

for (var i = 1; i < 10; i++) {
	setTimeout(function (x) {
		return function () {
			console.log(x);
		};
	}(i), 500 * i);
}

var f = function (x) {
	return function () {
		console.log(x);
	};
};

for (var i = 1; i < 10; i++) {
	setTimeout(f(i), 1000 * i);
}

for (var i = 0; i < 10; i++) {
	setTimeout(function (i) {
		console.log(i);
	}.bind(null, i), i * 500);
}

for (var i = 0; i < 10; i++) {
	setTimeout(function (i) {
		console.log(i);
	}, i * 500, i);
}

for (var i = 0; i < 10; i++) {
	setTimeout('console.log(' + i + ')', i * 500);
}

for (var i = 0; i < 10; i++) {
	var func = function callback() {
		console.log(callback.index);
	};
	func.index = i;
	setTimeout(func, i * 500);
}

for (var i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log(i);
	}, i * 500);
}


function F() {
}

function inherit(proto) {
	F.prototype = proto;
	return new F;
}