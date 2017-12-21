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
    panelInput.value = '';
    panelMonitor.value += '\n ' + str + '\n> ';
    panelMonitor.scrollTop = panelMonitor.scrollHeight;
}

function removeCommit(id) {
    delete commits[id];
}

function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, 10));
}

function commit() {
    createCommit();
    output('commited: [' + currentBranch + ' ' + heads[currentBranch].id + ']');
}

function branch(branchName) {
    var branchLog;
    if (heads.master === null) {
        output('*master');
        return;
    }
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

function createCommit() {
    var commit = {
        id: getHash(),
        parent1: heads[currentBranch] || null
    };
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
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

function merge(branchName) {
    if (!branchName) {
        output('Please choose branch');
        return;
    }
    if (!heads.hasOwnProperty(branchName)) {
        output(branchName + ' doesn\'t exist in git');
        return;
    }
    createMergeCommit(branchName);
    output(branchName + ' merged to ' + currentBranch);
}

function rebase(branchName) {
    if (!branchName) {
        output('Please choose branch');
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
        return;
    }
    if (commands.hasOwnProperty(parsedInputValue.command)) {
        commands[parsedInputValue.command](parsedInputValue.aim);
    } else {
        output('My git support commands: commit/log/branch/checkout/merge/revert/rebase');
    }
}


panelInput.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
        processCommand();
    }
});

panelButton.addEventListener('click', processCommand);
