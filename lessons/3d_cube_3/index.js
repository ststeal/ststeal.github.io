var cube = document.querySelector('.cube'),
	preCube = document.querySelector('.pre-cube'),
	speedInput = document.querySelector('.speed'),
	speedValue = 0;

speedInput.addEventListener('input', function () {
	speedValue = speedInput.value;
	preCube.style.animationDuration = [speedValue,'s'].join((''));
	cube.style.animationDuration = [speedValue,'s'].join('');
});