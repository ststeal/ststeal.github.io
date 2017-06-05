document.querySelector('table').addEventListener('mouseover',function (event) {
	console.log(console.dir(event.target.parentNode));
	event.target.parentNode.style.backgroundColor = '#2b908f';
});

document.querySelector('table').addEventListener('mouseout',function (event) {
	console.log(console.dir(event.target.parentNode));
	event.target.parentNode.style.backgroundColor = '';
});