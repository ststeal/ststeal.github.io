var arr = [];
function go(element) {
	for (var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeName === 'A') {
			arr.push(element.childNodes[i].href);
		} else {
			go(element.childNodes[i]);
		}
	}
}
go();
function go2(element, arr) {
	if (!arr) {
		var array = [];
		go2(element, array);
	}
	for (var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeName === 'A') {
			arr.push(element.childNodes[i].href);
		} else {
			console.log(element.links.lenght);
			if (arr.lenght === element.links.lenght) {
				console.log(arr);
			}
			go2(element.childNodes[i], arr);
		}
	}
}
go2(document);

function went(element, arr) {
	if (!arr) {
		arr = [];
	}
	for (var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeName === 'A') {
			arr.push(element.childNodes[i].href);
		} else {
			went(element.childNodes[i], arr);
		}
	}
	return arr;
}
went();