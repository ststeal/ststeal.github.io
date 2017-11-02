//'use strict';
var vith = function(){
	console.log(this);
};
vith();
vith.call(123);