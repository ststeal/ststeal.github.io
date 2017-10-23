var menu = document.querySelector('.menu');


document.querySelector('.menu-button').addEventListener('click', function () {
	menu.classList.toggle('menu-bar');

});

document.querySelector('.overlay').addEventListener('click', function () {
	menu.classList.toggle('menu-bar');
});

window.addEventListener('resize', function () {
	if (document.querySelector('.menu-bar')) {
		if (window.matchMedia('(min-width: 420px)').matches) {
			menu.classList.remove('menu-bar');
		}
	}
});