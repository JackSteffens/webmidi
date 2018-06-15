exports.setRequestUrl = function (app) {
    // # Controllers #
    var config = require(__dirname + '/config.js');
    var user = require('./server/controllers/user.controller.js');
    var room = require('./server/controllers/room.controller.js');

    // # Routing #
    // Authentication
    app.get('/api/user', user.getUser);
    app.post('/api/user', user.login);

    // Google Profile API
    app.get('/api/profile', user.getProfile);

    // Google OAuth Redirect
    app.get('/redirect', function (req, res) {
        res.sendFile(__dirname + '/public/views/redirect/redirect.html');
    });

    // Rooms
    app.get('/api/rooms', room.getRooms);
    app.get('/api/room', room.joinRoom);
    app.post('/api/room', room.createRoom);

    // Web application index
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/root.html');
    });
};
