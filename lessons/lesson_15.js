var counter = function (label) {
	var i = 0;
	return function incr () {
		return label + ' ' + ++i;
	};
};
var c1 = counter('c1');
var c2 = counter('c2');
console.log(c1());
console.log(c2());
console.log(c1());
console.log(c2());
console.log(c1());