require('use-strict');
const http = require('http');
const App = require('./app/router');

var server = http.createServer(function(req, res) {
    new App();
});

server.listen(8080);
