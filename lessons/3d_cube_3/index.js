var cube = document.querySelector('.cube'),
	preCube = document.querySelector('.pre-cube'),
	speedInput = document.querySelector('.speed'),
	speedValue = 0;

speedInput.addEventListener('input', function () {
	speedValue = speedInput.value;
	// preCube.style.animation = ['translateZ ',speedValue,'s ease-in infinite both'].join((''));
	// cube.style.animation = ['rotateX ',speedValue,'s ease-in infinite both'].join('');
	preCube.style.animationDuration = [speedValue,'s'].join((''));
	cube.style.animationDuration = [speedValue,'s'].join('');
	// preCube.style.animationDirection = 'alternate';
	// cube.style.animationDirection = 'alternate';
});