var zmq = require('zmq')
	Tnet = require('tnet'),
	EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits,
	MSocket = require('./msocket'),
	Request = require('./request'),
	ServerResponse = require('http').ServerResponse

function requestTokens (string, count) {
	var tokens = string.split(' ')
	var results = tokens.slice(0, count - 1)
	results.push(tokens.slice(count - 1).join(' '))
	console.assert(results.length === count, "Invalid message")
	return results
}

function parse (string) {
	var tokens = requestTokens(string, 4)
	var rest = Tnet.parseMany(tokens[3])

	return {
		uuid: tokens[0],
		id: tokens[1],
		path: tokens[2],
		headers: JSON.parse(rest[0]),
		body: rest[1]
	}
}

function Connection () {
	this.senderId = 'default'
	this.responsePort = null
	this.requestPort = null
}
inherits(Connection, EventEmitter)

Connection.prototype.listen = function (senderId, pullAddr, pubAddr) {
	self = this
	this.senderId = senderId

	this.responsePort = zmq.socket('pub')
	if (senderId) {
		this.responsePort.identity = senderId
	}
	this.responsePort.connect(pubAddr)

	this.requestPort = zmq.socket('pull')
	this.requestPort.connect(pullAddr)
	this.requestPort.on('message',
		function (z) {
			var msg = parse(z.toString('utf8'))
			if (msg.headers["METHOD"] === "JSON") {
				self.emit('json', msg, self.responsePort)
			}
			else {
				var req = new Request(msg)
				var res = new ServerResponse(req)
				res.assignSocket(new MSocket(msg, self.responsePort))
				self.emit('request', req, res)
			}
		}
	)
}

Connection.prototype.close = function () {
	if (this.requestPort) {
		this.requestPort.close()
	}
	if (this.responsePort) {
		this.responsePort.close()
	}
	//TODO: is there more cleanup to do?
}

module.exports = Connection
