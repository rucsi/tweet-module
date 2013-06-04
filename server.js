var http = require('http');
var app = require('./app');

var server = http.createServer(app);
server.listen(8080, function() {
  console.log('Server running at http://localhost:8080/');
});