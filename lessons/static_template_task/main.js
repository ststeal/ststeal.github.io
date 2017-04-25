/* globals doT $*/
var template = doT.template('<div>Hi {{=it.title}}!</div><div>{{=it.body || "This body is empty"}}' + '</div>');
var myDiv = document.createElement('div');
var xhr_one = 1;
var xhr_two = 2;
var xhr_three = 3;

function listener(xhr) {
	return xhr.onreadystatechange = function () {
		if (this.readyState === 4) {
			try {
				this.res = template(JSON.parse(xhr.responseText));
				insertContent(this.res);
			}
			catch (error) {
				console.log('request aborted');
			}
		}
	};
}

function insertContent(res) {
	myDiv.innerHTML = res;
	$('.content_box').append(myDiv);
}

function abort() {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i].readyState === 1) {
			arguments[i].abort();
		}
	}
}

//
// function ddd(xhr, source, tab) {
// 	if (event.target.id === tab) {
// 		if (!xhr.responseText) {
// 			xhr = new XMLHttpRequest();
// 			listener(xhr);
// 			xhr.open('GET', source, true);
// 			xhr.send();
// 		}
// 		else {
// 			insertContent(xhr.res);
// 		}
// 	}
// }

$('.menu_item').on('click', function (event) {

	if ($('.menu_item_active')[0] !== event.target) {
		$('.menu_item_active').removeClass('menu_item_active');
		event.target.classList.add('menu_item_active');
		if (event.target.id === 'one') {
			if (!xhr_one.responseText) {
				xhr_one = new XMLHttpRequest();
				listener(xhr_one);
				xhr_one.open('GET', 'source1.json', true);
				xhr_one.send();
				abort(xhr_three, xhr_two);
			}
			else {
				insertContent(xhr_one.res);
			}
		}
		if (event.target.id === 'two') {
			if (!xhr_two.responseText) {
				xhr_two = new XMLHttpRequest();
				listener(xhr_two);
				xhr_two.open('GET', 'source2.json', true);
				xhr_two.send();
				abort(xhr_one, xhr_three);
			}
			else {
				insertContent(xhr_two.res);
			}
		}
		if (event.target.id === 'three') {
			if (!xhr_three.responseText) {
				xhr_three = new XMLHttpRequest();
				listener(xhr_three);
				xhr_three.open('GET', 'source3.json', true);
				xhr_three.send();
				abort(xhr_two, xhr_one);
			}
			else {
				insertContent(xhr_three.res);
			}
		}
	}
});