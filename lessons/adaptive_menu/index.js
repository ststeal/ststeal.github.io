var menu = document.querySelector('.navigation__menu');
var overlay = document.querySelector('.overlay');
var menuButton = document.querySelector('.navigation__menu-button');

function toggleMenuStatus(toggle) {
	if (toggle === undefined) {
		toggle = !menu.classList.contains('navigation__menu-bar');
	}
	menu.classList.toggle('navigation__menu-bar', toggle);
	menuButton.setAttribute('aria-expanded', String(toggle));
	menuButton.setAttribute('aria-pressed', String(toggle));
}

menuButton.addEventListener('click', function () {
	toggleMenuStatus();
});

overlay.addEventListener('click', function () {
	toggleMenuStatus(false);
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
		toggleMenuStatus(false);
	}
});
