var m2n = require('./index')

m2n.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('Hello World\n')
}).listen('foobar' + Math.random(), 'tcp://127.0.0.1:9999', 'tcp://127.0.0.1:9998')


//*
var http = require('http')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}).listen(1337, "127.0.0.1")
//*/