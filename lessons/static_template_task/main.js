/* globals doT $*/
var template = doT.template('<div>Hi {{=it.title}}!</div><div>{{=it.body || "This body is empty"}}' + '</div>');
var res = {};
var lastReq;


function abortReq() {
	if (lastReq) {
		lastReq.abort();
	}
}


function req(target) {
	abortReq();
	var newResKey = target.attr('id') + '_req';
	var newReqKey = target.attr('id') + '';
	res[newResKey] = $.ajax({
		url: target.data('src'),
		success: function (data) {
			res[newReqKey] = template(JSON.parse(data));
			$('.content_box').html(res[newReqKey]);
		}
	});
	lastReq = res[newResKey];
}


$('.menu_item').on('click', function (event) {
	var $target = $(event.target);
	if (!$target.hasClass('menu_item_active')) {
		$('.menu_item_active').removeClass('menu_item_active');
		$target.addClass('menu_item_active');
		var eventRes = res[$target.attr('id')];
		if (!eventRes) {
			req($target);
		}
		else {
			$('.content_box').html(eventRes);
			abortReq();
		}
	}
});