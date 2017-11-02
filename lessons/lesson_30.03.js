var xhr2 = new XMLHttpRequest();
undefined
xhr2.open('GET','/portal/home-touch/manifest-ru.json',true);
undefined
xhr2.addEventListener('load',function(){
	console.log('load');
});
undefined
xhr2.addEventListener('complete',function(){
	console.log('complete');
});
undefined
xhr2.addEventListener('error',function(){
	console.log('error');
});
undefined
xhr2.onreadystatechange = function () {
	console.log(xhr2.readyState, xhr2.status);
	if (xhr2.readyState===4){
		console.log(xhr2.response, xhr2.responseText);
	}
}