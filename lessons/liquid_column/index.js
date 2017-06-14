var resizer = document.querySelector('.resize');
var container = document.querySelector('.container');
var first = document.querySelector('.first');
var second = document.querySelector('.second');
var resizerWidth = resizer.offsetWidth;
var minColumnWidth = 200;
var maxColumnWidth = 800;
var firstColumnWidth, secondColumnWidth;
var containerPositionX = container.offsetLeft;
var containerWidth = container.offsetWidth - resizerWidth;
console.log(containerWidth);

resizer.addEventListener('mousedown', function () {
	window.addEventListener('mousemove', mousemove);
});

window.addEventListener('mouseup', function () {
	window.removeEventListener('mousemove', mousemove);
});

function mousemove(event) {
	var firstWidth = first.offsetWidth;
	var newWidth = event.screenX - containerPositionX;
	console.log(event.screenX);
	console.log(containerPositionX);
	if (newWidth < minColumnWidth || newWidth > maxColumnWidth) {
		if (newWidth < minColumnWidth) {
			// first.style.width = minColumnWidth + 'px';
			// second.style.width = maxColumnWidth + 'px';
			firstColumnWidth = minColumnWidth + 'px';
			secondColumnWidth = maxColumnWidth + 'px';
		}
		if (newWidth > maxColumnWidth) {
			// first.style.width = maxColumnWidth + 'px';
			// second.style.width = minColumnWidth + 'px';
			firstColumnWidth = maxColumnWidth + 'px';
			secondColumnWidth = minColumnWidth + 'px';
		}
	}
	else {
		// first.style.width = newWidth + 'px';
		// second.style.width = containerWidth - firstWidth + 'px';
		firstColumnWidth = newWidth + 'px';
		secondColumnWidth = containerWidth - firstWidth + 'px';
	}
	second.style.width = secondColumnWidth;
	first.style.width = firstColumnWidth;
}