var readline = require('readline');
var rl = require('rl');
var fs = require('fs');

rl = readline.createInterface(process.stdin, process.stdout);
var cityA = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
var cityB;
var output = function () {
	for (var i = 0; i < cityB.length; i++) {
		console.log(cityB[i]);
	}
	console.log('\n');
};
output();
console.log('Choose type of sort dis+|pop+|wwp+ dis-|pop-|wwp-, or \'exit\' to close program ');
rl.on('line', function (cmd) {
	cityB = cityA.slice();
	switch (cmd) {
		case 'dis+':
			cityB.sort(function (a, b) {
				return a.dis - b.dis;
			});
			output();
			break;
		case 'dis-':
			cityB.sort(function (a, b) {
				return b.dis - a.dis;
			});
			output();
			break;
		case 'wwp+':
			cityB.sort(function (a, b) {
				return a.wwp - b.wwp;
			});
			output();
			break;
		case 'wwp-':
			cityB.sort(function (a, b) {
				return b.wwp - a.wwp;
			});
			output();
			break;
		case 'pop+':
			cityB.sort(function (a, b) {
				return a.pop - b.pop;
			});
			output();
			break;
		case 'pop-':
			cityB.sort(function (a, b) {
				return b.pop - a.pop;
			});
			output();
			break;
		case 'exit':
			rl.close();
			break;
		default:
			console.log('try again');
	}
});