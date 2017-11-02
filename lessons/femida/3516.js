var array = [1, 'string', null, function () {
}, [1, 2, [6, 7], ['6', '7']], '666'];

// var array = [1, 'string', null, function () {
// }, [1, 2, [3, '4', ['asd', '23213', [1, 2, 3, 4, ['222', '5454', 123]]]]],'666'];


function flatten(arr) {
	var newArr = arr.concat();
	for (var i = 0; i < newArr.length; i++) {
		var arrElem = newArr[i];
		if (Array.isArray(newArr[i])) {
			newArr.splice(i, 1);
			for (var j = 0; j < arrElem.length; j++) {
				newArr.splice(i + j, 0, arrElem[j]);
			}
		}
	}
	return newArr;
}

flatten(array);