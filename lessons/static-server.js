var http = require('http');
var fs = require('fs');
var url = require('url');
//var path = require('path');
//var static = require('node-static');

var server = new http.Server(function (req, res) {
  //console.log(req.headers);
  //console.log(req.method, req.url);
  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed.pathname);
  switch (urlParsed.pathname){
    case "/chess_js":
      fs.readFile('chess_js.html', {encoding: 'utf8'}, function (error, file) {
        if (!error) {
          res.writeHead(200, "OK", {"Cache-control": "no-cache", "Content-type": "text/html"});
          res.write(file);
          res.end("ok");
        }
        else{
          console.log(error)
          res.statusCode = 404;
          res.end("try another URL")
        }});
      break;
    case "/chess_no_js":
      fs.readFile('chess_no_js.html', {encoding: 'utf8'}, function (error, file) {
        if (!error) {
          res.writeHead(200, "OK", {"Cache-control": "no-cache", "Content-type": "text/html"});
          res.write(file);
          res.end("ok");
        }
        else{
          console.log(error)
          res.statusCode = 404;
          res.end("try another URL")
        }});
      break;
  }
  //fs.readFile('chess_js.html', {encoding: 'utf8'}, function (error, file) {
  //  if (!error) {
  //    res.writeHead(200, "OK", {"Cache-control": "no-cache", "Content-type": "text/html"});
  //    res.write(file);
  //    res.end();
  //  }
  //else{
  //    console.log(error)
  //    res.statusCode = 404;
  //    res.end("try another URL")
  //  }});
    //console.log(urlParsed);
    //if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
    //  res.writeHead(200, "OK", {"Cache-control": "no-cache", "Content-type": "text/html"});
    //  //res.setHeader("Cache-control", "no-cache");
    //  //res.statusCode = 200;
    //  res.end(urlParsed.query.message);
    //}
    //else {
    //  res.statusCode = 404;
    //  res.end("page not found")
    //}
  });

  server.listen(8080, "127.0.0.1");


//var fileServer = new static.Server('./static');
//http.createServer(function (request, response) {
//  request.addListener('end', function () {
//    //fileServer.serveFile('./text.html', 200, {}, request, response);
//    fileServer.serveFile('./cat.gif', 200, {}, request, response);
//  }).resume();
//}).listen(8080);