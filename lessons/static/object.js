var submit = function () {
    objStr = document.getElementById("obj").value;
    newObj = JSON.parse(objStr);
    $('span').text('▶ Object ' + objStr);
    for (var i in newObj) {
        var newLi = document.createElement('li');
        $(newLi).text(i + ": " + newObj[i]);
        list.appendChild(newLi);
        $('li').hide();
    }
}
var showProp = function () {
    $('li').toggle(500);
    if ($('span').text().charAt(0) === '▶') {
        $('span').text('▼ Object ' + objStr);
    }
    else {
        $('span').text('▶ Object ' + objStr);
    }
}