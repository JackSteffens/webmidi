exports.setRequestUrl = function (app) {
    // # Controllers #
    var config = require(__dirname + '/config.js');
    var user = require('./server/controllers/user.controller.js');

    // # Routing #
    // Pokedex
    app.get('/api/user', user.getUser);
    app.post('/api/user', user.login);
    app.get('/api/profile', user.getProfile);
    app.get('/redirect', function (req, res) {
        res.sendFile(__dirname + '/public/views/redirect/redirect.html');
    });

    // Web application index
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/root.html');
    });
};
