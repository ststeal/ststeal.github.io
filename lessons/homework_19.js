//function Calculator() {
//	this.operations = {
//		'-': function (a, b) {
//			return a - b;
//		},
//		'+': function (a, b) {
//			return a + b;
//		}
//	};
//	this.calculate = function (str) {
//		if (!(str.match(/[^\w\s]+/g))) {
//			return 'sorry man, need math symbol';
//		}
//		this.symbol = (str.match(/[^\w\s]+/g))[0];
//		this.numbers = str.match(/-?\d+/g);
//		this.one = parseInt(this.numbers[0], 10);
//		this.two = parseInt(this.numbers[1], 10);
//		return this.operations[this.symbol](this.one, this.two);
//	};
//	this.addMethod = function (str, func) {
//		this.operations[str] = func;
//	};
//}
//
//
//function Constr(str){
//	this.name = str;
//	return {name:str};
//}


function Rabbit(name) {
	if (!(this instanceof Rabbit)) {
		return new Rabbit(name);
	}
	this.name = name;
}
Rabbit.prototype.sayHi = function () {
	console.log('Hi');
}