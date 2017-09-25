var cube = document.querySelector('.container'),
	rotation = document.querySelector('.rotation'),
	distance = document.querySelector('.distance');

cube.style.transform = 'rotateX(0deg) translateZ(0px)';

rotation.addEventListener('input', function () {
	console.log(rotation.value, cube.style.transform);
	// cube.style.transform = ['rotateX(',rotation.value,'deg)'].join('');
	cube.style.transform = cube.style.transform.replace(/rotateX\([^ ]*\)/gi, ['rotateX(', rotation.value, 'deg)'].join(''));
});

distance.addEventListener('input', function () {
	console.log(distance.value, cube.style.transform);
	// cube.style.transform = ['translateZ(',distance.value,'px)'].join('');
	cube.style.transform = cube.style.transform.replace(/translateZ\([^ ]*\)/gi, ['translateZ(',distance.value,'px)'].join(''));
});