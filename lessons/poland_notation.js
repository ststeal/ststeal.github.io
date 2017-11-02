var operator = /^[+\-*\/]$/;
var numb = /^-?\d+$/;

function calcOperation(item, firstOperand, secondOperand) {
	switch (item) {
		case '+':
			return firstOperand + secondOperand;
		case '-':
			return firstOperand - secondOperand;
		case '*':
			return firstOperand * secondOperand;
		case '/':
			return firstOperand / secondOperand;
	}
}
function calc(str) {
	var numbArr = [];
	var array = str.split(' ');

	for (var i = 0; i < array.length; i++) {
		var item = array[i];

		if (numb.test(item)) {
			numbArr.push(Number(item));
		} else if (operator.test(item)) {
			var secondOperand = numbArr.pop();
			var firstOperand = numbArr.pop();
			numbArr.push(calcOperation(item, firstOperand, secondOperand));
		}
	}
	return numbArr.pop();
}

console.log(calc('7 2 3 1 * - - 3 5 + -'));
