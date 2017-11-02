var calculator = {
	read: function () {
		this.a = parseInt(prompt('a='),10);
		this.b = parseInt(prompt('b='),10);
	},
	sum: function () {
		return this.a+this.b;
	},
	mul: function () {
		return this.a*this.b;
	}
};


var ladder = {
	step: 0,
	up: function() {
		this.step++;
		return this;
	},
	down: function() {
		this.step--;
		return this;
	},
	showStep: function() {
		alert( this.step );
		return this;
	}
};
function test(a){
	console.log(a);
}
function tipeBind(func, ctx) {
	return function binded() {
		return func.apply(ctx, arguments);
	};
}