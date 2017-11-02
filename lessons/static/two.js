var abilities = {
	a: function (dev) {
		console.log(dev);
	},
	r: function (count) {
		console.log(parseInt(count, 10));
	}
};
var str = 'ssh -a wdevx.yandex.ry -r baba';
var arr = str.split(' ').splice(1);
var i = 0;
while (i < arr.length) {
	if (/^\-/.test(arr[i])) {
		abilities[arr[i].substr(1)](arr[++i]);
	}
	i++;
}