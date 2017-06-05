var resizer = document.querySelector('.resize');
var container = document.querySelector('.container');
var first = document.querySelector('.first');
var second = document.querySelector('.second');
var minColumnWidth = 200;
var maxColumnWidth = 800;
var containerWidth = container.offsetWidth;

resizer.addEventListener('mousedown', function () {
	window.addEventListener('mousemove', mousemove);
});

window.addEventListener('mouseup', function () {
	window.removeEventListener('mousemove', mousemove);
});

function mousemove(event) {
	var firstWidth = first.offsetWidth;
	if (event.screenX < minColumnWidth || event.screenX > maxColumnWidth) {
		if (event.screenX < minColumnWidth) {
			first.style.width = minColumnWidth + 'px';
			second.style.width = maxColumnWidth + 'px';
		}
		if (event.screenX > maxColumnWidth) {
			first.style.width = maxColumnWidth + 'px';
			second.style.width = minColumnWidth + 'px';
		}
	}
	else {
		first.style.width = event.screenX + 'px';
		second.style.width = containerWidth - firstWidth + 'px';
	}
}