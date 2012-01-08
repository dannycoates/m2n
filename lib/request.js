var EventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits

function Request (msg) {
	var version = msg.headers.VERSION;
	this.headers = msg.headers
	this.url = msg.headers.URI
	this.method = msg.headers.METHOD
	this.httpVersion = version.slice(version.indexOf('/') + 1)
	var x = this.httpVersion.split('.')
	this.httpVersionMajor = x[0]
	this.httpVersionMinor = x[1]
	this.connection = null
	this.socket = null
	this.emit('data', msg.body)
	this.emit('end')
}
inherits(Request, EventEmitter)

function noop() {}

Request.prototype.pause = noop
Request.prototype.resume = noop
Request.prototype.setEncoding = noop

module.exports = Request