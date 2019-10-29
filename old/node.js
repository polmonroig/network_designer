let http = require('http');


let draw2d = require('draw2d');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end();

}).listen(8080);
