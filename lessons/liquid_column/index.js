var resizer = document.querySelector('.resize');
var container = document.querySelector('.container');
var containerPositionX = container.offsetLeft;
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
	var newWidth = event.screenX - containerPositionX;
	if (newWidth < minColumnWidth || newWidth > maxColumnWidth) {
		if (newWidth < minColumnWidth) {
			first.style.width = minColumnWidth + 'px';
			second.style.width = maxColumnWidth + 'px';
		}
		if (newWidth > maxColumnWidth) {
			first.style.width = maxColumnWidth + 'px';
			second.style.width = minColumnWidth + 'px';
		}
	}
	else {
		first.style.width = newWidth + 'px';
		second.style.width = containerWidth - firstWidth + 'px';
	}
}