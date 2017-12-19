var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls-input');
var panelButton = document.querySelector('.panel__controls-button');
var heads = {};
var currentBranch;
var commits = {};
var inputValue, git, command, aim;
var commands = {
    commit: commit,
    log: log,
    checkout: checkout,
    merge: merge,
    rebase: rebase,
    revert: revert,
    branch: branch
};

function output(str) {
    panelMonitor.value += '\n ' + str + '\n> ';
    panelMonitor.scrollTop = panelMonitor.scrollHeight;
}

function inputComputed(input) {
    inputValue = input;
    panelMonitor.value += inputValue;
    var inputArray = inputValue.split(' ');
    git = inputArray[0];
    command = inputArray[1] || '';
    aim = inputArray[2];
    panelInput.value = '';
}

function createCommit() {
    if (!heads.hasOwnProperty('master')) {
        heads.master = null;
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

function removeCommit(id) {
    delete commits[id];
}

function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, 10));
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
            output('Git haven\'t any branch');
        }
    }
}

function merge(branchName) {
    if (!branchName) {
        panelMonitor.value += '\n Please choose branch \n> ';
        return;
    }
    if (!currentBranch) {
        panelMonitor.value += '\n You haven\'t any branch \n> ';
        return;
    }
    if (!heads.hasOwnProperty(branchName)) {
        panelMonitor.value += '\n This branch doesn\'t exist on git \n> ';
        return;
    }
    var commit = {
        id: getHash(),
        branch: branchName
    };
    commit.parent1 = heads[currentBranch];
    commit.parent2 = heads[branchName];
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
    output(branchName + ' merged to ' + currentBranch);
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

// function rebase(branchName) {
//     rebasedBranchCommits = new Set();
//     var currentCommit = heads[currentBranch];
//     do {
//         rebasedBranchCommits.add(currentCommit);
//         currentCommit = currentCommit.parent1;
//     } while (currentCommit);
//     currentCommit = heads[branchName];
//     var counter = 0;
//     while (!rebasedBranchCommits.has(currentCommit)) {
//         removeCommit(currentCommit.id);
//         currentCommit = currentCommit.parent1;
//         console.log(counter++);
//     }
//     console.log(currentCommit);
//     console.log(rebasedBranchCommits);
// }

function rebase(branchName) {
    if (!branchName) {
        panelMonitor.value += '\n Please choose branch \n> ';
        return;
    }
    var ontoBranchCommits = new Set();
    var currentCommit = heads[branchName];
    var counter = 0;
    while (currentCommit) {
        ontoBranchCommits.add(currentCommit);
        currentCommit = currentCommit.parent1;
    }
    console.log(ontoBranchCommits);
    currentCommit = heads[currentBranch];
    heads[currentBranch] = heads[branchName];
    while (!ontoBranchCommits.has(currentCommit)) {
        removeCommit(currentCommit.id);
        counter++;
        currentCommit = currentCommit.parent1;
        console.log('hi');
    }
    for (var i = 0; i < counter; i++) {
        createCommit();
    }
    console.log(heads);
    panelMonitor.value += '\n ' + currentBranch + ' rebase onto ' + branchName + ' \n> ';
}

function log() {
    if (!currentBranch) {
        output('nothing commited');
        return;
    }

    var commitsList = [];
    for (var i = 0, currentCommit = heads[currentBranch]; i < 8 && currentCommit; i++, currentCommit = currentCommit.parent1) {
        if (currentCommit.parent2) {
            commitsList.push('Merge branch ' + currentCommit.branch);
            break;
        } else {
            commitsList.push(currentCommit.id);
        }
    }
    output(commitsList.join('\n '));
}


function processCommand() {
    inputComputed(panelInput.value);
    if (git !== 'git') {
        // (inputValue ? panelMonitor.value += '\n ' + inputValue + ': command not found \n> ' : panelMonitor.value += '\n> ');

        // if (inputValue) {
        //     panelMonitor.value += '\n ' + inputValue + ': command not found \n> ';
        // } else {
        //     panelMonitor.value += '\n> ';
        // }

        panelMonitor.value += inputValue ?
            ('\n ' + inputValue + ': command not found \n> ') :
            '\n> ';

        return;
    }
    if (commands.hasOwnProperty(command)) {
        commands[command]();
    } else {
        output('My git support commands: commit/log/branch/checkout/merge/revert/rebase');
        // panelMonitor.value += '\n My git support commands: commit/log/branch/checkout/merge/revert/rebase \n> ';
        // panelMonitor.value += '\n Git: ' + command + ' is not a git command. \n> ';
    }
    // switch (command) {
    //     case 'commit':
    //         commit();
    //         break;
    //     case 'log':
    //         log();
    //         break;
    //     case 'branch':
    //         branch(aim);
    //         break;
    //     case 'checkout':
    //         checkout(aim);
    //         break;
    //     case 'merge':
    //         merge(aim);
    //         break;
    //     case 'revert':
    //         revert();
    //         break;
    //     case 'rebase':
    //         rebase(aim);
    //         break;
    //
    //     case '':
    //         panelMonitor.value += '\n My git support commands: commit/log/branch/checkout/merge/revert/rebase \n> ';
    //         break;
    //     default:
    //         panelMonitor.value += '\n Git: ' + command + ' is not a git command. \n> ';
    // }
}


panelInput.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
        processCommand();
    }
});

panelButton.addEventListener('click', processCommand);
