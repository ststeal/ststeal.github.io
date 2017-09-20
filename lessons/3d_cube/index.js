var cube = document.querySelector('.container'),
	range = document.querySelector('.rotation');
range.addEventListener('input', function () {
	console.log(range.value);
	cube.style.transform = ['rotateX(',range.value,'deg)'].join('');
});