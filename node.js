let http = require('http');


var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

$(window).on('load', function(){
    console.log("Document loaded");
    let draw2d = require('node_modules/draw2d/dist2d.min.js');
});

let fs = require('fs');

http.createServer(function(req, res){
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });


}).listen(8080);
