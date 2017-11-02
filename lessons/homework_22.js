function addLiveListener(element, type, selector, handler) {
	element.addEventListener(type, function (event) {
		if (event.target.closest(selector)) {
			handler.apply(this, arguments);
		}
	});
}

addLiveListener(document, 'hover', 'body', function () {
	console.log('LiveClick');
});
//    addListener(link,'click', function (event) {
//        console.log('link',event);
//        event.preventDefault();
//    });
var handlerBind = linkHandler.bind({});
link.addEventListener('click', handlerBind);
link.removeEventListener('click', handlerBind);
function linkHandler(event) {
	console.log('link', event);
	event.preventDefault();
}


function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

console.log(event.target);

function addSize() {

}

function addPadding() {
}

function addMargin() {
}
document.addEventListener('click', function (event) {
	console.log(event);
	//console.log((event.target).localName + '#' + (event.target).id + '.' + (event.target).className);
})


var myDiv = document.createElement('div');
myDiv.id = 'size666';
myDiv.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.3;background-color:blue;pointer-events:none;z-index:999');

document.addEventListener('mouseover', function (event) {
	if (event.target !== myDiv) {
		var pos = (event.target).getBoundingClientRect();
		myDiv.style.top = pos.top + 'px';
		myDiv.style.left = pos.left + 'px';
		myDiv.style.width = (event.target).offsetWidth + 'px';
		myDiv.style.height = (event.target).offsetHeight + 'px';
		document.body.append(myDiv);
		(event.target).title = (event.target).localName + '#' + (event.target).id + '.' + (event.target).className + ' | ' + (event.target).offsetWidth + ' x ' + (event.target).offsetHeight;
	}
});