var cube = document.querySelector('.cube'),
	rotationInput = document.querySelector('.rotation'),
	distanceInput = document.querySelector('.distance'),
	rotationValue=0,
	distanceValue=0;

function setTransform(rot,trans) {
	cube.style.transform = ['rotateX(', rot, 'deg)',' ','translateZ(', trans, 'px)'].join('');
}

cube.style.transform = 'rotateX(0deg) translateZ(0px)';

rotationInput.addEventListener('input', function () {
	rotationValue = rotationInput.value;
	setTransform(rotationValue,distanceValue);
});

distanceInput.addEventListener('input', function () {
	distanceValue = distanceInput.value;
	setTransform(rotationValue,distanceValue);
});