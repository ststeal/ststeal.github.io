document.querySelector('.menu-icon').addEventListener('click', function () {
	document.querySelector('.overlay').classList.toggle('overlay-animated');
	document.querySelector('.menu').classList.toggle('menu-bar');
	document.querySelectorAll('.menu-item').forEach(function (elem) {
		elem.classList.toggle('menu-item-bar');
	});
});