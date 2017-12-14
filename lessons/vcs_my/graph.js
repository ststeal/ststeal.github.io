/*global console */

var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls__input');
var panelButton = document.querySelector('.panel__controls__button');
var inputArray = [];
var git = {};
var heads = {};
var commitCounter = 0;


function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(10, 10)));
}

function initCommand() {
    var inputValue = panelInput.value;
    panelMonitor.value += inputValue;
    inputArray = inputValue.split(' ');
    if (inputArray[0] === 'git') {
        switch (inputArray[1]) {
            case 'commit':
                commitCounter++;
                if (heads.hasOwnProperty('master')) {
                    git[commitCounter] = {
                        id: getHash(),
                        branch: git[commitCounter - 1].branch,
                        parent: commitCounter - 1
                    };
                } else {
                    git[commitCounter] = {
                        id: getHash(),
                        branch: 'master'
                    };
                }
                heads.master = commitCounter;
                panelMonitor.value += '\n [' + git[commitCounter].branch + ' ' + git[commitCounter].id + '] \n> ';
                console.log(heads);
                break;
            case 'log':
                break;
            case 'branch':
                break;
            case 'checkout':
                break;
            case 'merge':
                break;
            case 'revert':
                panelMonitor.value += '\n revert: [' + 'master' + ' ' + git[heads.master].id + ']\n>';
                heads.master = commitCounter--;
                console.log(heads);
                break;
            case 'rebase':
                break;
            case undefined:
                panelMonitor.value += '\n my git support commands: commit/log/branch/checkout/merge/revert/rebase \n> ';
                break;
            default:
                panelMonitor.value += '\n git: ' + inputArray[1] + ' is not a git command. \n> ';
        }
    } else {
        inputValue ? panelMonitor.value += '\n ' + inputValue + ': command not found \n> ' : panelMonitor.value += '\n> ';
    }
    panelInput.value = '';
    panelMonitor.scrollTop = 99999;
    inputArray = [];
}


panelInput.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
        initCommand();
    }
});

panelButton.addEventListener('click', function () {
    initCommand();
});
