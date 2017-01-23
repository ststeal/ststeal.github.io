var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var mimeType = {
  html: "text/html",
  css: "text/css"
};
//console.log(__dirname, __filename, process.cwd())
var server = new http.Server(function (req, res) {
  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed);
  var contentType = mimeType[path.extname(urlParsed.pathname)];
  fs.readFile(path.join(__dirname, urlParsed.pathname.substring(1)), {encoding: 'utf8'}, function (error, file) {
    if (!error) {
      res.writeHead(200, {"Cache-control": "no-cache", "Content-type": contentType});
      res.write(file);
      res.end();
    }
    else {
      console.log(error);
      res.statusCode = 404;
      res.end("try another URL");
    }
  });
});

server.listen(8080, "127.0.0.1");