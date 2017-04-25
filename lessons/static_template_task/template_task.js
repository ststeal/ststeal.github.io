var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var pug = require('pug');

var mimeType = {
	html: 'text/html',
	css: 'text/css'
};

var template = fs.readFileSync('lessons/static_template_task/template_main.pug', {encoding: 'utf8'});
var pugTemplate = pug.compile(template);
var content = require('./template_task.json');
var server = new http.Server(function (req, res) {
	var urlParsed = url.parse(req.url, true);
	var contentType = mimeType[path.extname(urlParsed.pathname).substring(1)];
	if (urlParsed.pathname === '/main') {
		var html = pugTemplate(content);
		res.writeHead(200, {'Cache-control': 'no-cache', 'Content-type': contentType});
		res.write(html);
		res.end();
	}
	else {
		fs.readFile(path.join(__dirname, urlParsed.pathname.substring(1)), {encoding: 'utf8'}, function (error, file) {
			if (!error) {
				res.writeHead(200, {'Cache-control': 'no-cache', 'Content-type': contentType});
				res.write(file);
				res.end();
			}
			else {
				console.log(error);
				res.statusCode = 404;
				res.end('try another URL');
			}
		});
	}
});

server.listen(8081);