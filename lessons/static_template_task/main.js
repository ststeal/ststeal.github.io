/* globals doT $*/
var template = doT.template('<div>Hi {{=it.title}}!</div><div>{{=it.body || "This body is empty"}}' + '</div>');
var req = {};
var res = {};
var lastReq;

function abortReq() {
	if (lastReq) {
		lastReq.abort();
	}
}

function getContent($target) {
	abortReq();
	var id = $target.attr('id');
	req[id] = $.ajax({
		url: $target.data('src'),
		success: function (data) {
			res[id] = template(JSON.parse(data));
			$('.content_box').html(res[id]);
		}
	});
	lastReq = req[id];
}

$('.menu_item').on('click', function (event) {
	var $target = $(event.target);
	if (!$target.hasClass('menu_item_active')) {
		$('.menu_item_active').removeClass('menu_item_active');
		$target.addClass('menu_item_active');
		var eventRes = res[$target.attr('id')];
		if (!eventRes) {
			getContent($target);
		}
		else {
			$('.content_box').html(eventRes);
			abortReq();
		}
	}
});