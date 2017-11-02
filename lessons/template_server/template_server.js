var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var handlebars = require('handlebars');
var pug = require('pug');

var mimeType = {
	html: 'text/html',
	css: 'text/css'
};

var template;
var context = JSON.parse(fs.readFileSync('lessons/template_server/ex.json',{encoding:'utf8'}));
var server = new http.Server(function (req, res) {
	var urlParsed = url.parse(req.url, true);
	var contentType = mimeType[path.extname(urlParsed.pathname).substring(1)];
	fs.readFile(path.join(__dirname, urlParsed.pathname.substring(1)), {encoding: 'utf8'}, function (error, file) {
		console.log(path.join(__dirname, urlParsed.pathname.substring(1)));
		if (!error) {
			if (urlParsed.pathname === '/ex_handlebars.hbs') {
				template = handlebars.compile(file);
			}
			if (urlParsed.pathname === '/ex_pug.jade') {
				template = pug.compile(file);
			}
			var html = template(context);
			res.writeHead(200, {'Cache-control': 'no-cache', 'Content-type': contentType});
			res.write(html);
			res.end();
		}
		else {
			console.log(error);
			res.statusCode = 404;
			res.end('try another URL');
		}
	});
});

server.listen(8080, '127.0.0.1');