var table = document.querySelector('table');
var header = document.querySelector('.first');

// table.addEventListener('mouseover',function (event) {
// 	event.target.parentNode.style.backgroundColor = '#2b908f';
// });
//
// table.addEventListener('mouseout',function (event) {
// 	event.target.parentNode.style.backgroundColor = '';
// });

document.addEventListener('scroll', function () {
	header.style.left = 0 - window.scrollX + 'px';
	if (window.scrollY >= table.offsetTop) {
		header.style.display = 'block';
	}
	if (window.scrollY < table.offsetTop) {
		header.style.display = 'none';
	}
});