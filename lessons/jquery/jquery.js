/* globals $ */
// var $ = require('jquery');

var obj = {
	a: {
		one: 1,
		two: 2,
		three: 3
	},
	b: [4, 5, 6]
};

var collection = $.param(obj);

var listItems = $('li');
var listItems2 = $('a', 'li');
var menu = $('#menu');
var divItems = $('div', menu);
var divItems2 = $('div', '#menu');

// console.log(divItems);
// console.log(divItems2);
console.log(listItems2);
// console.log(divItems===divItems2);

// console.log(listItems, menu, divItems);


$('a').parents('#list').css('color', 'white');
$('a').closest('#list').css('background-color', 'green');

$('#menu').data('data', 'one');
$('a').parents('#list').attr('data-some', 'boom');

divItems.each(function (index, item) {
	console.log(this);
	if (index === 1) {
		console.log('stop in second item');
		return false;
	}
});

listItems.each(function (index, item) {
	console.log('each ' + index + ':' + this.outerText);
	console.log(item);
});

for (var i = 0; i < listItems.length; i++) {
	console.log('for ' + listItems[i].outerText);
}

console.log('$(".div_item").outerWidth(true): ' + $('.div_item').outerWidth(true));
console.log('$(".div_item").outerWidth(): ' + $('.div_item').outerWidth());
console.log('$(".div_item").innerWidth(): ' + $('.div_item').innerWidth());
console.log('$(".div_item").width(): ' + $('.div_item').width());
console.log('$("div>div").hasClass("div_item"): ' + $('div>div').hasClass('div_item'));
console.log('$("h1").text(): ' + $('h1').text());


setTimeout(function () {
	$('div>div').toggleClass('div_item');
}, 1000);
setTimeout(function () {
	$('div>div').removeClass('div_item');
}, 2000);
setTimeout(function () {
	$('div>div').addClass('div_item');
}, 3000);
setTimeout(function () {
	$('textarea').scrollTop(1000);
}, 4000);
setTimeout(function () {
	$('textarea').scrollTop(0);
	$('ul').html('<button> Click here man!</button>');
}, 5000);
setTimeout(function () {
	$(document).scrollLeft(1000);
}, 6000);
setTimeout(function () {
	$('#menu').after('<li class="li_item">after</li>');
	$('#menu').before('<li class="li_item">before</li>');
	$('#list').prepend('<li class="li_item">prepend</li>');
	$(document).scrollLeft(0);
	$('#list').append('<li class="li_item">Append</li>');
}, 7000);
setTimeout(function () {
	$('.li_item').detach();
	$('textarea').empty();
	$('.div_item:nth-child(2)').unwrap();
}, 8000);
setTimeout(function () {
	$('h1').hide(500);
	$('h2').fadeIn(500);
}, 9000);
setTimeout(function () {
	$('h1').show(500);
	$('h2').fadeOut(500);
}, 9500);

$('#toogle').on('click', function () {
	$('h3').slideToggle(500);
});

function gir() {
	$(this).css({'width': '500px'});
}
function fit() {
	$(this).css({'width': '100px'});
}

$('#toogleFunc').on('click', function () {
	$('h4').toggle(fit, gir);
});

$('#get').on('click', function (event) {
	$.get('https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js', {'type': 'text'});
	$.ajax({
		url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
		method: 'POST',
		data: 'hello'
	});

	console.log(event.namespace);
});

$('#post').on('click', function () {
	$.ajax({
		url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
		method: 'GET',
		data: 'hello',
		dataType: 'jsonp'
	});
	$.post('https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js', {'type': 'text'});
});

$('#ajax').on('click', function () {
	$.ajax({
		url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
		method: 'POST',
		data: 'hello',
		xhrFields: {
			withCredentials:true
		}
	});

	$.ajax('https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js', {'type': 'text'});
});

$(document).ready(function () {
	alert('DOM is ready');
	$('.div_item').on('click', function () {
		alert('its on listener');
	});
	// $('textarea').live('click', function () {
	// 	alert('its live listener');
	// });
});

$('.input').val('jquery text');