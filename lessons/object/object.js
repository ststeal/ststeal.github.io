var objStr;
var submit = function () {
	if (document.getElementsByTagName('li')[0] !== null) {
		$('li').remove();
	}
	objStr = document.getElementById('obj').value;
	var newObj = JSON.parse(objStr);


	$('span').text('▶ Object ' + objStr);
	for (var i in newObj) {
		if (newObj.hasOwnProperty(i)) {
			var newLi = document.createElement('li');
			$(newLi).text(i + ': ' + newObj[i]);
			list.appendChild(newLi);
			$('li').hide();
		}
	}
};

var showProp = function () {
	$('li').toggle(500);
	if ($('span').text().charAt(0) === '▶') {
		$('span').text('▼ Object ' + objStr);
	}
	else {
		$('span').text('▶ Object ' + objStr);
	}
};