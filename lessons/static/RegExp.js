var str = new RegExp('\\');
/^'[^']*((\\')*[^']*)*'$/.test();
/(^'[^']*((\\')*[^']*)*'$)|(^"[^"]*((\\")*[^"]*)*"$)/.test();
var num = new RegExp('^-?((\d+)$)|(\x16)');
var bool = new RegExp('(false)|(true)');

var a = [];
for (var i=0;i<101;i++){
    a[i] = i;
}
a[0] = {'ppc': 1};
for (var i = 0; i < 101; i++) {
    a[i+1] = Object.create(a[i]);
}
