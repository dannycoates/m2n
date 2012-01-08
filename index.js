var Connection = require('./lib/connection')

exports.createServer = function(requestHandler) {
	var connection = new Connection();
	if (typeof requestHandler === 'function') {
		connection.on('request', requestHandler)
	}
	return connection;
}
