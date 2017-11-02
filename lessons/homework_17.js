var arr = [12, 13, 11, 32, 0, -2, 2];

arr.reduce(function (a, b) {
	if (b > a) {
		a = b;
	}
	return a;
}, 0);

arr.reduce(function (a, b) {
	if (b < a) {
		a = b;
	}
	return a;
}, 0);

function maxMy(arr) {
	var maxVal = arr[0];
	arr.forEach(function (a) {
		if (a > maxVal) {
			maxVal = a;
		}
	});
	return maxVal;
}

function minMy(arr) {
	var maxVal = arr[0];
	arr.forEach(function (a) {
		if (a < maxVal) {
			maxVal = a;
		}
	});
	return maxVal;
}
maxMy();
minMy();