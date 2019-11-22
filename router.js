exports.setRequestUrl = function (app) {
  // # Controllers #
  const user = require('./server/controllers/user.controller.js');
  const room = require('./server/controllers/room.controller.js');
  const passport = require('passport');

  // # Routing #
  // Authentication
  app.get('/api/user', user.getLoggedInUser);
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile']
  }));
  app.get('/auth/google/callback',
    passport.authenticate('google'),
    function (req, res) {
      res.redirect('/#!/login?access_token=' + req.user.accessToken);
    });
  app.get('/auth/google/callback/fail', function (req, res) {
    // TODO Error handling
    console.error('Authentication failed. Redirecting to Login');
    res.redirect('/');
  });

  // Google Profile API
  app.get('/api/profile', user.getProfile);

  // Rooms
  app.get('/api/rooms', room.getRooms);
  app.get('/api/room', room.getRoom);
  app.post('/api/room/join', room.joinRoom);
  app.delete('/api/room/leave', room.leaveRoom);
  app.post('/api/room', room.createRoom);

  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/dist/index.html');
  });
};
