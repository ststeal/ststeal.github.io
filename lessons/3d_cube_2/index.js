var cube = document.querySelector('.cube'),
	preCube = document.querySelector('.pre-cube'),
	rotationInput = document.querySelector('.rotation'),
	distanceInput = document.querySelector('.distance'),
	rotationValue,distanceValue;

rotationInput.addEventListener('input', function () {
	rotationValue = rotationInput.value;
	cube.style.transform = ['rotateX(', rotationValue, 'deg)'].join('');
});

distanceInput.addEventListener('input', function () {
	distanceValue = distanceInput.value;
	preCube.style.transform = ['translateZ(', distanceValue, 'px)'].join('');
});