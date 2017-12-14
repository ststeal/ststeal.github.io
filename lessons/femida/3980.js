var l = [1, 4, 5, 2, 3, 9, 8, 12, 0, 11, 15];
var l2 = [1, 4, 5, 12, 0, 11, 15, 15, 15, 20];

function makeLove(arr) {
    var arrStr = [];
    var arrSorted = arr.slice();
    arrSorted.sort(function (a, b) {
        return a - b;
    });
    for (var i = 0, count = 0; i < arrSorted.length; i++) {
        count++;
        if (arrSorted[i] !== arrSorted[i + 1] - 1) {
            if (arrSorted[i + 1 - count] === arrSorted[i]) {
                arrStr.push(arrSorted[i]);
            } else {
                arrStr.push(arrSorted[i + 1 - count] + '-' + arrSorted[i]);
                count = 0;
            }
        }
    }
    return arrStr.join(',');
}

function makeLove2(arr) {
    var arrStr = [];
    var arrSorted = arr.slice();
    arrSorted.sort(function (a, b) {
        return a - b;
    });
    for (var i = 0, count = 0; i < arrSorted.length; i++) {
        count++;
        if (i + 1 === arrSorted.length || arrSorted[i] + 1 !== arrSorted[i + 1]) {
            if (count === 1) {
                arrStr.push(arrSorted[i]);
            } else {
                arrStr.push(arrSorted[i + 1 - count] + '-' + arrSorted[i]);
            }
            count = 0;
        }
    }
    return arrStr.join(',');
}

makeLove(l2);
makeLove2(l2);
