var path = require('path');
var roomRepo = require(path.resolve(__dirname + '/../repositories/room.repository.js'));
var websocket = require('../utils/websocket.js');

/**
 *
 * @param {String} roomId
 * @param {Object} note
 */
function sendNoteToRoom(roomId, note) {
    // TODO Add user authorization before broadcasting
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

/**
 *
 * @param roomId
 * @param user
 * @param callback
 */
function joinRoom(roomId, user, callback) {
    roomRepo.updateRoomUsers(roomId, user, function (error, room) {
        if (error) console.error(error);
        else if (room) {
            console.log('User ' + user.name + ' has joined room ' + room.name);
            announceUserJoined(roomId, user);
        }
        return callback(error, room);
    });
}

/**
 *
 * @param roomId
 * @param callback
 */
function getRoom(roomId, callback) {
    roomRepo.getRoom(roomId, function (error, room) {
        if (error) console.error(error);
        else if (room) console.log('Found room : ' + room.name);
        return callback(error, room);
    });
}

/**
 *
 * @param roomName
 * @param user
 * @param callback
 */
function createRoom(roomName, user, callback) {
    var room = {
        name: roomName,
        users: [user],
        ownerId: user.id
    };

    roomRepo.createRoom(room, function (error, newRoom) {
        if (error) console.error(error);
        else if (newRoom) console.log('Created new room : ' + room.name);
        callback(error, newRoom);
    });
}

/**
 *
 * @param callback
 */
function getRooms(callback) {
    roomRepo.getRooms(function (error, rooms) {
        if (error) console.error(error);
        else if (rooms) console.log('Found ' + rooms.length + ' rooms');
        return callback(error, rooms);
    });
}

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom,
    getRooms: getRooms,
    joinRoom: joinRoom,
    sendNoteToRoom: sendNoteToRoom
};