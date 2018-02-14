const a = 1;
const b = {};

a = 2;

let c = 3;

(function () {
    let d = '66';
    console.log(d, typeof e);
    {
        let d = 55;
        let e = 44;
        console.log(d, e);
    }
    console.log(d, e);
})();

(function () {
    for (var i = 0; i < 10; i++) {
        setTimeout(function () {
            console.log(i);
        }, 0);
    }
})();
