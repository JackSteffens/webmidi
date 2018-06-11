var websocket = require('../utils/websocket.js');

/**
 *
 * @param {String} roomId
 * @param {Object} note
 */
function sendNoteToRoom(roomId, note) {
    websocket.broadcastRoom(roomId, 'note', note);
}

/**
 *
 * @param roomId
 * @param user
 */
function announceUserJoined(roomId, user) {
    websocket.broadcastRoom(roomId, 'user', user);
}

module.exports = {};