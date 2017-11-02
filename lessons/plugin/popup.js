/* globals chrome */
document.querySelector('.controls').addEventListener('click', function (event) {
	var target = event.target;
	var inputValue = document.querySelector('input').value;
	if (target.className === 'image') {
		chrome.tabs.executeScript({
			code: ' document.querySelector("body").style.backgroundImage = ' + '"url(' + inputValue + '";'
		});
	}
	if (target.className === 'color') {
		chrome.tabs.executeScript({
			code: ' document.querySelector("body").style.backgroundColor = ' + '"' + inputValue + '";'
		});
	}
});