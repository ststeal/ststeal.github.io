var second;
first();
function first() {
	console.log('first');
}
second = function () {
	console.log('second');
};
second();
(function third() {
	var faf = 45;
	console.log('third');
	function fif() {
		var faf;
		faf = 23;
		console.log(faf);
	}

	fif();
	console.log(faf);
})();
var str = '123213';
parseInt(str, 10);
//var tit = {faf: 45};
//tit.uff = 88;
//var tat = Object.create(tit);
//tat.faf = 23;
//console.log(tat.faf,tat.uff);
/*var fuf;
 if (!first) {
 fuf = function () {
 console.log('if');
 };
 }
 else {
 fuf = function () {
 console.log('else');
 };
 }
 fuf();*/
