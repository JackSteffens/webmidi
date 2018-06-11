// Configuration
function init(server) {
    var io = require('socket.io')(server);          // Socket.io
    io.on('connect', function () {
        console.log('[i] Client connected to websocket');
        io.emit('connected', 'Websocket has been connected'); // TODO Don't globally broadcast
    });
}

/**
 * Broadcast websocket message or object to a specific channel
 * @param {String} channel
 * @param {Object} {message}
 */
function broadcast(channel, message) {
    io.emit(channel, message);
}

/**
 *
 * @param room
 * @param channel
 * @param message
 */
function broadcastRoom(room, channel, message) {
    io.sockets.in(room).emit(channel, message);
}

module.exports = {
    init: init,
    broadcast: broadcast,
    broadcastRoom: broadcastRoom
};
