var messageArea = document.querySelector('.message-area');
var message = document.querySelector('#message');
var sent = document.querySelector('#sent');
var attach = document.querySelector('#attach');

function toLastMessage() {
	messageArea.scrollTop = document.querySelector('.message:last-child').offsetTop;
}

toLastMessage();

sent.addEventListener('click', function () {
	if (!message.value) {
		return;
	}
	var newMessage = document.createElement('div');
	newMessage.className = 'message my';
	newMessage.textContent = message.value;
	messageArea.append(newMessage);
	toLastMessage();
	message.value = '';
	message.focus();

});

attach.addEventListener('click', function () {
	console.log('attach');
});

message.addEventListener('click', function () {
	console.log('message');
});