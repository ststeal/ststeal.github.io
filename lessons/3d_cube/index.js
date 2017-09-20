var cube = document.querySelector('.container'),
	rotation = document.querySelector('.rotation'),
	distance = document.querySelector('.distance');

rotation.addEventListener('input', function () {
	console.log(rotation.value);
	cube.style.transform = ['rotateX(',rotation.value,'deg)'].join('');
});

distance.addEventListener('input', function () {
	console.log(distance.value);
	cube.style.transform = ['translateZ(',distance.value,'px)'].join('');
});