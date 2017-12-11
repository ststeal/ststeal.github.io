/*global console */

var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls__input');
var panelButton = document.querySelector('.panel__controls__button');
var git = {};
var inputArray = [];
var currentBranch;
var currentCommit;

function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(10, 10)));
}

function initCommand() {
    panelMonitor.value += panelInput.value;
    inputArray = panelInput.value.split(' ');
    switch ([inputArray[0], inputArray[1]].join(' ')) {
        case 'git commit':
            if (!git.master) {
                git.master = [];
                currentBranch = 'master';
            }
            var commit = getHash();
            git[currentBranch].push(commit);
            currentCommit = git[currentBranch].length - 1;
            panelMonitor.value += '\n [' + currentBranch + ' ' + commit + '] \n> ';
            break;
        case 'git log':
            if (!currentBranch || git[currentBranch].length === 0) {
                panelMonitor.value += '\n nothing commited';
            } else {
                for (var i = 0; i < git[currentBranch].length; i++) {
                    panelMonitor.value += '\n commit: ' + git[currentBranch][git[currentBranch].length - (1 + i)];
                }
            }
            panelMonitor.value += '\n>';
            break;
        case 'git show':
            break;
        case 'git diff':
            break;
        case 'git branch':
            if (inputArray[2]) {
                if (git.hasOwnProperty(inputArray[2])) {
                    panelMonitor.value += '\n Branch ' + inputArray[2] + ' already exist in git' + '\n> ';
                } else {
                    git[inputArray[2]] = git[currentBranch].slice();
                    panelMonitor.value += '\n Branch created: ' + inputArray[2] + '\n> ';
                }
            } else {
                panelMonitor.value += '\n Branch: ' + currentBranch + '\n> ';
            }
            break;
        case 'git checkout':
            currentBranch = inputArray[2];
            currentCommit = git[currentBranch].length - 1;
            panelMonitor.value += '\n Checkout to: ' + currentBranch + '\n> ';
            break;
        case 'git cherry-pick':
            break;
        case 'git merge':
            if (inputArray[2] && git.hasOwnProperty(inputArray[2])) {
                git[inputArray[2]] = git[currentBranch].concat(git[inputArray[2]]);
                panelMonitor.value += '\n Branch ' + currentBranch + ' merged to ' + inputArray[2] + '\n> ';
                currentBranch = inputArray[2];
                currentCommit = git[currentBranch].length - 1;
            } else {
                panelMonitor.value += '\n choose correct branch \n>';
            }
            break;
        case 'git revert':
            if (git[currentBranch].length === 0) {
                panelMonitor.value += '\n nothing to revert \n>';
            } else {
                panelMonitor.value += '\n revert: ' + git[currentBranch].pop() + '\n>';
                currentCommit = git[currentBranch].length - 1;
            }
            break;
        case 'git rebase':
            break;
        case '':
            panelMonitor.value += '\n> ';
            break;
        default:
            panelMonitor.value += ': command not found \n> ';
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
