for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
        var SummDok = document.getElementsByClassName('tr>td:nth-child(n+1)');
        var SummSumm = j | i;
        SummDok.innerHTML = SummSumm;
        console.log(j | i);
        console.log(j & i);
        console.log(j ^ i);
    }
}