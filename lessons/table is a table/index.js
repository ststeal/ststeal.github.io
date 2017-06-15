var table = document.querySelector('table');
var header = document.querySelector('thead');
var gap = document.createElement('div');
gap.style.height = document.querySelector('tr').offsetHeight + 'px';
gap.className = 'gap';
header.style.top = 0;


document.addEventListener('scroll', function () {
	if (window.scrollY >= table.offsetTop) {
		header.style.position = 'fixed';
		header.style.left = 0 - window.scrollX + 'px';
		if (!document.querySelector('.gap')) {
			table.insertBefore(gap, table.firstChild);
		}
	}
	if (window.scrollY < table.offsetTop) {
		header.style.position = 'static';
		if (document.querySelector('.gap')) {
			table.removeChild(gap);
		}
	}
});