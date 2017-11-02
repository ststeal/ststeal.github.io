function strjoin() {
	var arr = [].slice.call(arguments);
	var sep = arr.shift();
	return arr.join(sep);
}

strjoin('-', 'a', 'b', 'c', 'd', 'e', 'f');

var arr = [
	{name: 'width', value: 10},
	{name: 'height', value: 20}
];

function arrObj(arr) {
	var obj = {};
	for (var i = 0; i < arr.length; i++) {
		obj[arr[i].name] = arr[i].value;
	}
	return obj;
}

function calc(str) {
	var operator = new RegExp(/[\+\-\*\/]/, '');
	var numb = new RegExp(/\d+/, '');

	var numbArr = [];
	var numbArrLenght, result;
	var array = str.split(' ');

	for (var i = 0; i < array.length; i++) {
		if (numb.test(array[i])) {
			numbArr.push(array[i]);
		}
		if (operator.test(array[i])) {
			numbArrLenght = numbArr.length;
			result = eval(numbArr[numbArrLenght - 2] + array[i] + '(' + numbArr[numbArrLenght - 1] + ')');
			numbArr.splice(numbArrLenght-2,2);
			numbArr.push(result);
		}
	}

	return numbArr.pop();
}

calc('7 2 3 1 * - - 3 5 + -');