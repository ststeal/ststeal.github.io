var menu = document.querySelector('.menu');
var overlay = document.querySelector('.overlay');
var menuButton = document.querySelector('.menu-button');
function changeMenuStatus() {
	var pressed = (menuButton.getAttribute('aria-pressed') === 'true');
	var show = (menu.classList.contains('menu-bar'));
	menu.setAttribute('aria-expanded', String(show));
	menuButton.setAttribute('aria-pressed', String(!pressed));
}

if (window.innerWidth < 420) {
	menu.setAttribute('aria-expanded', 'false');
	menuButton.setAttribute('aria-pressed', 'false');
}

menuButton.addEventListener('click', function () {
	menu.classList.toggle('menu-bar');
	changeMenuStatus();
});

overlay.addEventListener('click', function () {
	menu.classList.toggle('menu-bar', false);
	changeMenuStatus();
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
		menu.removeAttribute('aria-expanded');
		menuButton.removeAttribute('aria-pressed');
	}
});

window.matchMedia('(max-width: 420px)').addEventListener('change', function (event) {
	if (event.matches) {
		menu.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('aria-pressed', 'false');
	}
});
