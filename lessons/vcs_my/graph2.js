/*global console */

var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls__input');
var panelButton = document.querySelector('.panel__controls__button');
var inputArray = [];
var heads = {};
var currentBranch;
var commits = {};
var inputValue, git, command, aim;

function inputComputed(input) {
    inputValue = input;
    panelMonitor.value += inputValue;
    inputArray = inputValue.split(' ');
    git = inputArray[0];
    command = inputArray[1];
    aim = inputArray[2];
    panelInput.value = '';
}

function createCommit() {
    if (!heads.hasOwnProperty('master')) {
        heads.master = '';
        currentBranch = 'master';
    }
    var commit = {
        id: getHash()
    };
    if (heads[currentBranch]) {
        commit.parent1 = heads[currentBranch];
    }
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
}

function commit() {
    createCommit();
    panelMonitor.value += '\n commited: [' + currentBranch + ' ' + heads[currentBranch].id + '] \n> ';
}

function branch(branchName) {
    if (branchName) {
        if (heads[branchName]) {
            panelMonitor.value += '\n Branch ' + branchName + ' already exist in git' + '\n> ';
        } else {
            heads[branchName] = heads[currentBranch];
            panelMonitor.value += '\n Branch created: ' + branchName + '\n> ';
        }
    } else {
        if (currentBranch) {
            panelMonitor.value += '\n Branch: ' + currentBranch + '\n> ';
        } else {
            panelMonitor.value += '\n Git haven\'t any branch' + '\n> ';
        }
    }
}

function merge(mergedBranch) {
    var commit = {
        id: getHash()
    };
    commit.parent1 = heads[currentBranch];
    commit.parent2 = heads[mergedBranch];
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
    panelMonitor.value += '\n ' + mergedBranch + ' merged to ' + currentBranch + ' \n> ';
}

function checkout(branchName) {
    if (branchName) {
        if (heads[branchName]) {
            currentBranch = branchName;
            panelMonitor.value += '\n Checkout to: ' + currentBranch + '\n> ';
        } else {
            panelMonitor.value += '\n Branch ' + branchName + ' doesn\'t exist in git' + '\n> ';
        }
    } else {
        panelMonitor.value += '\n Please choose branch' + '\n> ';
    }
}

function revert() {
    if (heads[currentBranch]) {
        panelMonitor.value += '\n Reverted: [' + currentBranch + ' ' + heads[currentBranch] + ']\n>';
        heads[currentBranch] = commits[heads[currentBranch]].parent1;
    } else {
        panelMonitor.value += '\n Nothing to revert \n>';
    }
}

function log() {
    for (var i = 0; i < 3; i++) {
        var currentCommit;
        if (currentBranch) {
            if (i === 0) {
                currentCommit = heads[currentBranch];
            } else {
                currentCommit = currentCommit.parent1;
                if (!currentCommit) {
                    panelMonitor.value += '\n> ';
                    break;
                }
            }
        } else {
            panelMonitor.value += '\n nothing commited \n>';
            break;
        }
        panelMonitor.value += '\n ' + currentCommit.id;
    }
}

function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(10, 10)));
}


function initCommand() {
    inputComputed(panelInput.value);
    if (git === 'git') {
        switch (command) {
            case 'commit':
                commit();
                break;
            case 'log':
                log();
                break;
            case 'branch':
                branch(aim);
                break;
            case 'checkout':
                checkout(aim);
                break;
            case 'merge':
                merge(aim);
                break;
            case 'revert':
                revert();
                break;
            case 'rebase':
                break;
            case undefined:
                panelMonitor.value += '\n My git support commands: commit/log/branch/checkout/merge/revert/rebase \n> ';
                break;
            default:

                panelMonitor.value += '\n Git: ' + command + ' is not a git command. \n> ';
        }
    } else {
        inputValue ? panelMonitor.value += '\n ' + inputValue + ': command not found \n> ' : panelMonitor.value += '\n> ';
    }
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
