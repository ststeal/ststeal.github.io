/*global Set*/

var panelMonitor = document.querySelector('.panel__monitor');
var panelInput = document.querySelector('.panel__controls-input');
var panelButton = document.querySelector('.panel__controls-button');
var parsedInputValue;
var currentBranch = 'master',
    commits = {},
    heads = {
        master: null
    },
    commands = {
        commit: commit,
        log: log,
        checkout: checkout,
        merge: merge,
        rebase: rebase,
        revert: revert,
        branch: branch
    };

function inputParse(input) {
    var parsedInput = input.split(' ');
    return {
        vcs: parsedInput[0] || '',
        command: parsedInput[1] || '',
        aim: parsedInput[2] || ''
    };
}

function output(str) {
    if (!str) {
        str = '';
    }
    panelMonitor.value += panelInput.value;
    panelMonitor.value += '\n ' + str + '\n> ';
    panelMonitor.scrollTop = panelMonitor.scrollHeight;
}


function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, 10));
}

function createMergeCommit(mergeBranch) {
    var commit = {
        id: getHash(),
        parent1: heads[currentBranch] || null,
        parent2: heads[mergeBranch] || null
    };
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
}

function createCommit() {
    var commit = {
        id: getHash(),
        parent1: heads[currentBranch] || null
    };
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
}

function commit() {
    createCommit();
    output('Commited: [' + currentBranch + ' ' + heads[currentBranch].id + ']');
}

function branch(branchName) {
    var branchLog;
    if (!branchName) {
        branchLog = [];
        for (const key in heads) {
            if (heads.hasOwnProperty(key)) {
                branchLog.push(key === currentBranch ? '*' + key : key);
            }
        }
        branchLog = branchLog.join('\n ');
    } else if (heads.hasOwnProperty(branchName)) {
        branchLog = 'Branch ' + branchName + ' already exist in git';
    } else {
        heads[branchName] = heads[currentBranch];
        branchLog = 'Branch created: ' + branchName;
    }
    output(branchLog);
}

function checkout(branchName) {
    if (branchName) {
        if (heads.hasOwnProperty(branchName)) {
            currentBranch = branchName;
            output('Checkout to: ' + currentBranch);
        } else {
            output('Branch ' + branchName + ' doesn\'t exist in git');
        }
    } else {
        output('Please choose branch');
    }
}

function revert() {
    if (heads.hasOwnProperty(currentBranch)) {
        output('Reverted: [' + currentBranch + ' ' + heads[currentBranch] + ']');
        heads[currentBranch] = commits[heads[currentBranch]].parent1;
    } else {
        output('Nothing to revert');
    }
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

function testBranch(branch) {
    if (!branch) {
        output('Please choose branch');
        return true;
    }
    if (!heads.hasOwnProperty(branch)) {
        output(branch + ' doesn\'t exist in git');
        return true;
    }
    if (branch === currentBranch) {
        output(branch + ' is current branch');
        return true;
    }
}

function merge(branchName) {
    if (testBranch(branchName)) {
        return;
    }

    createMergeCommit(branchName);
    output(branchName + ' merged to ' + currentBranch);
}

// function removeCommit(id) {
//     delete commits[id];
// }

function rebase(branchName) {
    if (testBranch(branchName)) {
        return;
    }

    var ontoBranchCommits = new Set();
    var currentCommit = heads[branchName];

    var counter = 0;

    while (currentCommit) {
        ontoBranchCommits.add(currentCommit);
        currentCommit = currentCommit.parent1;
    }

    currentCommit = heads[currentBranch];
    while (!ontoBranchCommits.has(currentCommit)) {
        currentCommit = currentCommit.parent1;
        counter++;
    }

    if (currentCommit === heads[branchName]) {
        output(currentBranch + ' is already up-to-date');
        return;
    }

    heads[currentBranch] = heads[branchName];
    for (var i = 0; i < counter; i++) {
        // removeCommit(currentCommit.id);
        createCommit();
    }

    output(currentBranch + ' rebase onto ' + branchName);
}


function processCommand() {
    var panelInputValue = panelInput.value;
    if (!panelInputValue) {
        output();
        return;
    }
    parsedInputValue = inputParse(panelInputValue);
    if (parsedInputValue.vcs !== 'git') {
        output(parsedInputValue.vcs + ': command not found');
        panelInput.value = '';
        return;
    }
    if (commands.hasOwnProperty(parsedInputValue.command)) {
        commands[parsedInputValue.command](parsedInputValue.aim);
    } else {
        output('My git support commands: commit/log/branch/checkout/merge/revert/rebase');
    }
    panelInput.value = '';
}


panelInput.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
        processCommand();
    }
});

panelButton.addEventListener('click', processCommand);
