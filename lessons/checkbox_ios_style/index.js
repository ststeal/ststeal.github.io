var container = document.querySelector('.container');
var checkbox = document.querySelector('.checkbox');

container.addEventListener('click', function () {
	checkbox.classList.toggle('checked');
	checkbox.classList.toggle('unchecked');
	container.classList.toggle('bg-on');
	container.classList.toggle('bg-off');
});