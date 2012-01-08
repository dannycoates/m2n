# m2n

A [Mongrel2](https://github.com/zedshaw/mongrel2) Handler for node.js

## Usage

Add `m2n` to your `package.json`

```js
	{
		"dependencies" : {
			"m2n": "~0.0.1"
		}
	}
```

## API

m2n mostly follows the server half of the node [http api](http://nodejs.org/docs/latest/api/http.html)

The main difference is that it neither the `request` or `response` objects have access to a raw `socket`. If you need socket access, m2n is not for you.

You also `listen` on zmq sockets instead of tcp.

		listen(senderId, pullAddress, pubAddress)

## example

```js
var m2n = require('m2n')

m2n.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('Hello World\n')
}).listen('foobar', 'tcp://127.0.0.1:9999', 'tcp://127.0.0.1:9998')
```

## TODO

- add Mongrel2 advanced features

