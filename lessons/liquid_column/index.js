var resizer = document.querySelector('.resize');
var container = document.querySelector('.container');
var first = document.querySelector('.first');
var second = document.querySelector('.second');
var RESIZER_WIDTH = 5;
var MIN_COLUMN_WIDTH = 200;
var containerPositionX = container.offsetLeft;
var containerWidth = container.offsetWidth;

resizer.addEventListener('mousedown', function () {
    window.addEventListener('mousemove', mousemove);
});

window.addEventListener('mouseup', function () {
    window.removeEventListener('mousemove', mousemove);
});

function mousemove(event) {
    var leftColumn = event.screenX - containerPositionX,
        rightColumn,
        minWidth = MIN_COLUMN_WIDTH;

    if (containerWidth < MIN_COLUMN_WIDTH * 2) {
        minWidth = containerWidth / 2;
    }

    if (leftColumn < minWidth) {
        leftColumn = minWidth;
    }
    rightColumn = containerWidth - leftColumn - RESIZER_WIDTH;
    if (rightColumn < minWidth) {
        rightColumn = minWidth;
        leftColumn = containerWidth - rightColumn - RESIZER_WIDTH;
    }

    first.style.width = leftColumn + 'px';
    second.style.width = rightColumn + 'px';
}
