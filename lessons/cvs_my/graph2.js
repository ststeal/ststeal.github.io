/*global console */

var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls__input');
var panelButton = document.querySelector('.panel__controls__button');
var inputArray = [];
var heads = {};
var currentBranch;
var commits = {};


function createCommit() {
    if (!heads.hasOwnProperty('master')) {
        heads.master = '';
        currentBranch = 'master';
    }
    var commit = {
        id: getHash()
    };
    if (heads.master) {
        commit.parent = heads.master;
    }
    heads[currentBranch] = commit.id;
    commits[commit.id] = commit;
}

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
                createCommit();
                panelMonitor.value += '\n commited: [' + currentBranch + ' ' + heads[currentBranch] + '] \n> ';
                break;
            case 'log':
                for (var i = 0; i < 3; i++) {
                    var currentCommit;
                    if (i === 0) {
                        currentCommit = heads[currentBranch];
                        if (!currentCommit) {
                            panelMonitor.value += '\n nothing commited \n>';
                            break;
                        }
                    } else {
                        currentCommit = commits[currentCommit].parent;
                        if (!currentCommit) {
                            panelMonitor.value += '\n> ';
                            break;
                        }
                    }
                    panelMonitor.value += '\n ' + commits[currentCommit].id;
                }
                break;
            case 'branch':
                if (inputArray[2]) {
                    if (heads[inputArray[2]]) {
                        panelMonitor.value += '\n Branch ' + inputArray[2] + ' already exist in git' + '\n> ';
                    } else {
                        heads[inputArray[2]] = heads[currentBranch];
                        panelMonitor.value += '\n Branch created: ' + inputArray[2] + '\n> ';
                    }
                } else {
                    panelMonitor.value += '\n Branch: ' + currentBranch + '\n> ';
                }
                break;
            case 'checkout':
                if (heads[inputArray[2]]) {
                    currentBranch = inputArray[2];
                    panelMonitor.value += '\n Checkout to: ' + currentBranch + '\n> ';
                } else {
                    panelMonitor.value += '\n Branch ' + inputArray[2] + ' doesn\'t exist in git' + '\n> ';
                }
                break;
            case 'merge':
                break;
            case 'revert':
                if (heads[currentBranch]) {
                    panelMonitor.value += '\n reverted: [' + currentBranch + ' ' + heads[currentBranch] + ']\n>';
                    heads[currentBranch] = commits[heads[currentBranch]].parent;
                } else {
                    panelMonitor.value += '\n nothing to revert \n>';
                }
                break;
            case 'rebase':
                break;
            case undefined:
                panelMonitor.value += '\n my git support commands: commit/log/branch/checkout/merge/revert/rebase \n> ';
                break;
            default:
                panelMonitor.value += '\n git: ' + inputArray[1] + ' is not a git command. \n> ';
        }
    }
    else {
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
