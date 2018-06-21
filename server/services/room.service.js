'use strict';
var path = require('path');
var roomRepo = require(path.resolve(__dirname + '/../repositories/room.repository.js'));
var websocket = require('../utils/websocket.js');
var bcrypt = require('bcrypt');

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
 * @param {String} roomId
 * @param {User} user
 */
function announceUserJoined(roomId, user) {
    websocket.broadcastRoom(
        roomId,
        'users',
        'User ' + user.name + ' joined the room');
}

/**
 *
 * @param {String} roomId
 * @param {String} password
 * @param {User} user
 * @param {Function} callback
 */
function joinRoom(roomId, password, user, callback) {
    // TODO Check if password protected, and if it matches
    roomRepo.getRoom(roomId, function (error, room) {
        if (error) console.error(error);
        if (room) {
            if (room.passwordRequired) {
                joinProtectedRoom(room, password, user, callback);
            } else {
                updateRoomWithJoinedUser(room, user, callback);
            }
        } else {
            callback(error, room);
        }
    });
}

/**
 *
 * @param {Room} room
 * @param {String} password
 * @param {User} user
 * @param {Function<Error, Room>} callback
 */
function joinProtectedRoom(room, password, user, callback) {
    if (room.password === password) {
        updateRoomWithJoinedUser()
    } else {
        callback(new Error('Wrong password'), null);
    }
}

/**
 *
 * @param {Room} room
 * @param {User} user
 * @param {Function<Error, Room>} callback
 */
function updateRoomWithJoinedUser(room, user, callback) {
    listenToRoomWebsocket(room);
    if (roomContainsUser(room, user)) {
        announceUserJoined(room._id, user);
        return callback(null, room);
    } else {
        roomRepo.updateRoomUsers(room._id, user, function (error, room) {
            if (error) console.error(error);
            else if (room) {
                maskRoom(user, room);
                console.log('User ' + user.name + ' has joined room ' + room.name);
                announceUserJoined(room._id, user);
            }
            return callback(error, room);
        });
    }
}

function listenToRoomWebsocket(room) {
    var socket = websocket.getRoomSocket(room._id);
    var news = io
        .of('/news')
        .on('connection', function (socket) {
            socket.emit('item', {news: 'item'});
        });
}

/**
 *
 * @param {String} roomId
 * @param {User} user
 * @param {Function} callback
 */
function getRoom(roomId, user, callback) {
    roomRepo.getRoom(roomId, function (error, room) {
        if (error) console.error(error);
        else if (room) console.log('Found room : ' + room.name);
        room = filterRooms(user, [room]);
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
        users: [],
        owner: user,
        password: null,
        passwordRequired: false
    };

    roomRepo.createRoom(room, function (error, newRoom) {
        if (error) console.error(error);
        else if (newRoom) console.log('Created new room : ' + room.name);
        callback(error, newRoom);
    });
}

/**
 *
 * @param {User} user
 * @param callback
 */
function getRoomsForUser(user, callback) {
    roomRepo.getRooms(function (error, rooms) {
        if (error) console.error(error);
        else if (rooms) console.log('Found ' + rooms.length + ' rooms');
        rooms = filterRooms(user, rooms);
        return callback(error, rooms);
    });
}

function maskRoom(user, room) {
    if (user._id.equals(room.owner._id)) {
        room.possession = 'OWNED';
    } else if (roomContainsUser(room, user)) {
        room.possession = 'JOINED';
    } else {
        room.possession = 'ACCESSIBLE';
    }
    maskUser(room.users);
    maskUser([room.owner]);
    room.password = null;
}

/**
 *
 * @param {Array<Room>} rooms
 * @param {User} user the authenticated user
 * @param {String} user.name the authenticated user
 */
function filterRooms(user, rooms) {
    rooms.forEach(function (room) {
        maskRoom(user, room);
    });
    return rooms;
}

/**
 *
 * @param {Array<User>} users
 */
function maskUser(users) {
    users.forEach(function (user) {
        user.accessToken = null;
        user.accessTokenExpiry = null;
        user.googleId = null;
    });
}

/**
 *
 * @param {Room} room
 * @param {Array<User>} room.users
 * @param {User} user the authenticated user
 * @param {String} user._id
 */
function roomContainsUser(room, user) {
    return room.users.some(function (roomUser) {
        return user._id.equals(roomUser._id);
    });
}

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom,
    getRoomsForUser: getRoomsForUser,
    joinRoom: joinRoom,
    sendNoteToRoom: sendNoteToRoom
};