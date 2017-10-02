var cube = document.querySelector('.cube'),
	preCube = document.querySelector('.pre-cube'),
	rotationInput = document.querySelector('.rotation'),
	distanceInput = document.querySelector('.distance'),
	rotationValue= rotationInput.value,
	distanceValue;

cube.style.transform = ['rotateX(', rotationValue, 'deg) rotateY(20deg)'].join('');

rotationInput.addEventListener('input', function () {
	rotationValue = rotationInput.value;
	cube.style.transform = ['rotateX(', rotationValue, 'deg) rotateY(20deg)'].join('');
});

distanceInput.addEventListener('input', function () {
	distanceValue = distanceInput.value;
	preCube.style.transform = ['translateZ(', distanceValue, 'px)'].join('');
});