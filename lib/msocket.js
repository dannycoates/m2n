function MSocket(msg, socket) {
	this.msg = msg
	this.socket = socket
	this.writable = true;
}

MSocket.prototype.destroy = function () {
	//TODO: what to do here?
}

MSocket.prototype.write = function (data) {
	this.socket.send(
		this.msg.uuid +
		" " +
		this.msg.id.length +
		":" +
		this.msg.id +
		", "
		+ data)
}

module.exports = MSocket