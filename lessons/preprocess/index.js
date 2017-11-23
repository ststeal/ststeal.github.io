var navigation = document.querySelector('.navigation');
var overlay = document.querySelector('.navigation__overlay');
var menuButton = document.querySelector('.navigation__menu-button');

function toggleMenuStatus(toggle) {
	if (toggle === undefined) {
		toggle = !navigation.classList.contains('navigation_sidebar_yes');
	}
	navigation.classList.toggle('navigation_sidebar_yes', toggle);
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
