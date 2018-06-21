var io = require('socket.io');

// Configuration
function init(server) {
    io = io(server);          // Socket.io
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
 * @param {String} room id
 * @param {String} channel name
 * @param {String} message
 */
function broadcastRoom(room, channel, message) {
    io.in(room).emit(channel, message);
}

/**
 *
 * @param {String} roomId
 */
function getRoomSocket(roomId) {

}

module.exports = {
    init: init,
    broadcast: broadcast,
    broadcastRoom: broadcastRoom,
    getRoomSocket: getRoomSocket
};
