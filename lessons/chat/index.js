var messageArea = document.querySelector('.message-area');
var input = document.querySelector('input');
messageArea.scrollTop = document.querySelector('.message:last-child').offsetTop;
document.querySelector('.controls-box').addEventListener('click', function (event) {
	var target = event.target;
	if (target.id === 'message') {
		console.log('message');
	}
	if (target.id === 'sent') {
		console.log('sent');
		var newMessage = document.createElement('div');
		newMessage.className = 'message my';
		newMessage.textContent = document.querySelector('#message').value;
		messageArea.append(newMessage);
		messageArea.scrollTop = document.querySelector('.message:last-child').offsetTop;
		input.value = '';
		input.focus();
	}
	if (target.id === 'attach') {
		console.log('attach');
	}
});