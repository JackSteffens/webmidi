var io = require('socket.io');

// Configuration
function init(server) {
    io = io(server);
    io.on('connection', function (socket) {
        console.log('[i] Client connected to websocket with id ' + socket.id);
        io.emit('connected', 'New player has connected');

        socket.on('joinRoom', function (roomId) {
            console.log(socket.id + ' just joined room ' + roomId + '. Connecting websocket listener');
            socket.on(roomId, function (message) {
                io.emit(roomId, message);
            })
        });

        socket.on('leaveRoom', function (roomId) {
            console.log(socket.id + ' just left room ' + roomId + '. Disconnecting websocket listener');
            socket.off(roomId);
        });
    });

    io.on('joinRoom', function (socket) {
        console.log('socket ' + socket.id + ' just joined a room. caught at io.on()');
    });
}

/**
 * Broadcast websocket message or object to a specific channel
 * @param {String} channel
 * @param {Object} message
 * @param {Object} message.key
 * @param {Object} message.value
 */
function broadcast(channel, message) {
    io.emit(channel, message);
}

module.exports = {
    init: init,
    broadcast: broadcast
};
