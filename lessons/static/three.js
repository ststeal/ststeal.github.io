Number.prototype.sum = function (a) {
    return a = a || 0,this + a;
}
num = 4;
num.sum(4).sum(5).sum(6);