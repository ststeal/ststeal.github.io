/* globals CodeMirror */
var myCodeMirror = CodeMirror(document.querySelector('div.main'), {
	value: 'div{}',
	mode:  'css'
});
var pageStyle = document.querySelector('style');
function insertNewStyle() {
	pageStyle.innerText = myCodeMirror.getValue();
}
function debounce(fn, timeout, invokeAsap, ctx) {
	var timer;
	if (arguments.length === 3 && typeof invokeAsap !== 'boolean') {
		ctx = invokeAsap;
		invokeAsap = false;
	}
	return function () {
		var args = arguments;
		ctx = ctx || this;
		if (invokeAsap && !timer) {
			fn.apply(ctx, args);
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			if (!invokeAsap) {
				fn.apply(ctx, args);
			}
			timer = null;
		}, timeout);
	};
}
myCodeMirror.on('change', debounce(insertNewStyle, 500));