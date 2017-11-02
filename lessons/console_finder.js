var fs = require('fs');
var fn = require('fn');

var optimist = require('optimist')
	.usage('$0: This is an example on how to use optimist')
	.options({
		fuzzy: {
			alias: 'f',
			description: 'Fuzzy search in file',
			default: false
		},
		help: {
			alias: 'h',
			description: 'displays usage'
		},
		line: {
			alias: 'l',
			description: 'Output line indexes of matches',
			default: false
		},
	})
	.boolean('h')
	.boolean('l')
	.boolean('f');

var argv = optimist.argv;
var file = argv._[0];
var str = argv._[1];

if (argv.help || !file || !str) {
	optimist.showHelp();
	process.exit(0);
}

var indexStr = 0;
var fileData = fs.readFileSync(file, 'utf8');
var result, strCopy, check, i, checkStr;
var strCounter = 0;
var resLine = [];
var resStr = [];

function escapeRegExp(lineCheck) {
	return lineCheck.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

if (argv.fuzzy) {
	checkStr = '[^a-zA-Z0-9$_][a-zA-Z0-9$_]*';
	for (i = 0; i < str.length; i++) {
		checkStr += escapeRegExp(str[i]) + '[a-zA-Z0-9$_]*';
	}
	checkStr += '[^a-zA-Z0-9$_]';
}
else {
	checkStr = '[^a-zA-Z0-9$_]' + escapeRegExp(str) + '[^a-zA-Z0-9$_]';
}
check = new RegExp('(' + checkStr + '\\s*=\\s*function)|(function\\s*' + checkStr + ')', 'g');

while ((result = check.exec(fileData))) {
	strCopy = fileData.substr(indexStr, result.index);
	strCounter = strCopy.match(/\n/g);
	resLine.push(strCounter.length + 1);
	resStr.push(result[0]);
	//indexStr = result.index;
}


for (i = 0; i < resLine.length; i++) {
	if (argv.line) {
		console.log('line ' + resLine[i] + ':\t' + resStr[i]);
	}
	else {
		console.log(resStr[i]);
	}
}