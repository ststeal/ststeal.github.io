function output(ft, tt) {
    console.log(['from', ft, 'to', tt].join(' '));
}

function hanoi(ft, tt, bt, ringQuantity) {
    if (ringQuantity === 1) {
        output(ft, tt);
    } else {
        hanoi(ft, bt, tt, ringQuantity - 1);
        output(ft, tt);
        hanoi(bt, tt, ft, ringQuantity - 1);
    }
}
