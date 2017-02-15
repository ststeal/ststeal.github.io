var stack = [];

var pop = function () {
    var popStr = stack.pop();
    console.log(stack);
    $('p').text('stack [' + stack + ']');
    document.getElementById("pop_output").value = popStr;
}

var push = function () {
    var pushStr = document.getElementById("input_push").value;
    stack.push(pushStr);
    console.log(stack);
    $('p').text('stack [' + stack + ']');
}