/*global Set,rect*/

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
    },
    d3jsData = {
        nodes: [],
        links: []
    };

/**
 * Парсинг вводимой команды
 * @param {string} input Введенная строка
 * @returns {object} Распаршеная строка
 * */
function inputParse(input) {
    var parsedInput = input.split(' ');
    return {
        vcs: parsedInput[0] || '',
        command: parsedInput[1] || '',
        aim: parsedInput[2] || ''
    };
}

/**
 * Вывод вводимой команды в консоль
 * @param {string} commandString Введенная строка
 * */
function outputCommand(commandString) {
    panelMonitor.value += commandString;
}

/**
 * Текстовый вывод результата команды
 * @param {string} str Результат операции
 * */
function output(str) {
    if (!str) {
        str = '';
    }
    panelMonitor.value += '\n ' + str + '\n> ';
    panelMonitor.scrollTop = panelMonitor.scrollHeight;
}

/**
 * Генерация рандомного хеша коммита
 * @return {string} рандомный хеш коммита
 * */
function getHash() {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, 10));
}

/**
 * Создание коммита с двумя родителями (мерж-коммит)
 * @param {string} mergeBranch Ветка для мержа
 * */
function createMergeCommit(mergeBranch) {
    var commit = {
        id: getHash(),
        parent1: heads[currentBranch] || null,
        parent2: heads[mergeBranch] || null
    };
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
}

/**
 * Создание коммита с одним родителем
 * */
function createCommit() {
    var commit = {
        id: getHash(),
        parent1: heads[currentBranch] || null
    };
    heads[currentBranch] = commit;
    commits[commit.id] = commit;
}

/**
 * Создание коммита с одним родителем и вывод в консоль результата
 * */
function commit() {
    createCommit();
    output('Commited: [' + currentBranch + ' ' + heads[currentBranch].id + ']');
}

/**
 * Создание новой ветки
 * @param {string} branchName Имя новой ветки
 * */
function branch(branchName) {
    var branchLog;
    if (!branchName) {
        branchLog = [];
        for (var key in heads) {
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

/**
 * Извлечение указанной ветки
 * @param {string} branchName Имя новой ветки
 * */
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

/**
 * Реверт коммита
 * @param {string} hash Хэш коммита который нужно ревертнуть
 * */
function revert(hash) {
    createCommit();
    output('Reverted: ' + hash);
}

/**
 * Вывод гит-истории текущей ветки
 * @param {number} quantity Кол-во коммитов для вывода
 * @param {string} commit Коммит, до которого выводить лог
 * */
function log() {
    var commitsList = [];
    for (var i = 0, currentCommit = heads[currentBranch]; i < 8 && currentCommit; i++, currentCommit = currentCommit.parent1) {
        if (currentCommit.parent2) {
            commitsList.push('Merge branch ' + currentCommit);
            break;
        } else {
            commitsList.push(currentCommit.id);
        }
    }
    output(commitsList.join('\n '));
}

/**
 * Проверка есть ли ветка в гите, находимся ли мы в той же ветке, и передана ли вообще ветка в ф-цию
 * @param {string} branch Проверяемая ветка
 * @return {boolean} результат проверки
 * */
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
    return false;
}

/**
 * Создание мерж-коммита и вывод результата в консоль
 * @param {string} branchName Имя ветки для мержа
 * */
function merge(branchName) {
    if (testBranch(branchName)) {
        return;
    }

    createMergeCommit(branchName);
    output(branchName + ' merged to ' + currentBranch);
}

/**
 * Ребейз ветки на основе выбранной
 * @param {string} branchName Имя ветки для ребейза
 * */
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
        createCommit();
    }

    output(currentBranch + ' rebase onto ' + branchName);
}

/**
 * Обработка введенной в инпут команды
 * */
function processCommand() {
    var panelInputValue = panelInput.value;
    outputCommand(panelInputValue);
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
        getd3jsData(commits);
        // if (d3jsData.links.length !== 0) {
        //     rect();
        // }
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

function getd3jsData(commits) {
    d3jsData.nodes = [];
    d3jsData.links = [];
    getNodes(commits);
    getLinks(commits);
}

function getLinks(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var commit = data[key];
            if (commit.parent1) {
                d3jsData.links.push({source: commit.id, target: commit.parent1.id, value: 2});
            }
            if (commit.parent2) {
                d3jsData.links.push({source: commit.id, target: commit.parent2.id, value: 2});
            }
        }
    }
}


function getNodes(data) {
    for (var key in data) {
        d3jsData.nodes.push({id: data[key].id, group: 1});
    }
}
