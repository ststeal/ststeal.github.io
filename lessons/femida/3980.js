var l = [1, 4, 5, 2, 3, 9, 8, 12, 0, 11, 15];

function makeLove(arr) {
	var arrStr = [];
	var arrSorted = arr.concat();
	arrSorted.sort(function (a, b) {
		return a - b;
	});
	for (var i = 0, count = 0; i < arrSorted.length; i++) {
		count++;
		if (arrSorted[i] !== arrSorted[i + 1] - 1) {
			if (arrSorted[i + 1 - count] === arrSorted[i]) {
				arrStr.push(arrSorted[i]);
			}
			else {
				arrStr.push(arrSorted[i + 1 - count] + '-' + arrSorted[i]);
				count = 0;
			}
		}
	}
	return arrStr.join(',');
}

makeLove(l);