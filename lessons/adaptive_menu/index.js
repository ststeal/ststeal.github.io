var menu = document.querySelector('.menu');

document.querySelector('.menu-button').addEventListener('click', function () {
	menu.classList.toggle('menu-bar');
});

document.querySelector('.overlay').addEventListener('click', function () {
	menu.classList.toggle('menu-bar', false);
});

// window.addEventListener('resize', function () {
// 	if (menu.classList.contains('.menu-bar')) {
// 		if (window.matchMedia('(min-width: 420px)').matches) {
// 			menu.classList.toggle('menu-bar',false);
// 		}
// 	}
// });

window.matchMedia('(min-width: 420px)').addEventListener('change', function (event) {
	if (event.matches) {
		menu.classList.remove('menu-bar');
	}
});
