//var blessed = require('blessed');
var read = require('read');
var readline = require('readline');
var rl = require('rl');
var fs = require("fs");

rl = readline.createInterface(process.stdin, process.stdout);
var city = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
var output = function(){
    for (i=0;i<city.length;i++){
        console.log(city[i]);
    }
    console.log('\n');
}
//console.log(city);
//console.log(city.sama[1].name)
//var city = [];
//function city(name, wwp, pop, dis) {
//    this.name = name;
//    this.wwp = wwp;
//    this.pop = pop;
//    this.dis = dis;
//    city[city.length] = this;
//}
//var sama = new city('Самара', 1, 2, 3);
//var kiev = new city('Киев', 2, 3, 1);
//var chel = new city('Набережные Челны', 3, 1, 2);
//var yar = new city('Ярославль', 3, 3, 1);
output();
console.log('Choose type of sort dis+|pop+|wwp+ dis-|pop-|wwp-, or \'exit\' to close program ');
rl.on('line', function (cmd) {
    switch (cmd) {
        case 'dis+':
            //console.log('choose \'+\' or \'-\'')
            city.sort(function (a, b) {
                return a.dis - b.dis
            })
            output();
            break
        case 'dis-':
            city.sort(function (a, b) {
                return b.dis - a.dis
            })
            output();
            break
        case 'wwp+':
            city.sort(function (a, b) {
                return a.wwp - b.wwp
            })
            output();
            break
        case 'wwp-':
            city.sort(function (a, b) {
                return b.wwp - a.wwp
            })
            output();
            break
        case 'pop+':
            city.sort(function (a, b) {
                return a.pop - b.pop
            })
            output();
            break
        case 'pop-':
            city.sort(function (a, b) {
                return b.pop - a.pop
            })
            output();
            break
        case 'exit':
            rl.close();
            break
        default:
            console.log('try again')
    }
});