'use strict';
var path = require('path');
var bcrypt = require('bcrypt');

var websocket = require('../utils/websocket.js');
var roomRepo = require(path.resolve(__dirname + '/../repositories/room.repository.js'));

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
 * @param {RoomUser} roomUser
 */
function announceUserJoined(roomId, roomUser) {
    // TODO roomUser must be masked! This announcement will be used to display a new player into the UI
    websocket.broadcastRoom(
        roomId,
        'users',
        'User ' + roomUser.user.name + ' joined the room');
}

/**
 *
 * @param {String} roomId {@link Room._id}
 * @param {String} password {@link Room.password}
 * @param {User} user
 * @param {Array<Number>} keys an array of numbers between 0 and 127
 * @param {Function<Error, Room>} callback
 */
function joinRoom(roomId, password, user, keys, callback) {
    // TODO Check if password protected, and if it matches
    var roomUserObj = {
        user: user,
        keys: keys
    };

    roomRepo.getRoom(roomId, function (error, room) {
        if (error) console.error(error);
        if (room) {
            if (room.passwordRequired) {
                joinProtectedRoom(room, password, roomUserObj, callback);
            } else {
                updateRoomWithJoinedUser(room, roomUserObj, callback);
            }
        } else {
            callback(error, room);
        }
    });
}

/**
 * TODO Use bcrypt
 * @param {Room} room {@link Room}
 * @param {String} password {@link Room.password}
 * @param {RoomUser} roomUser
 * @param {Function<Error, Room>} callback
 */
function joinProtectedRoom(room, password, roomUser, callback) {
    if (room.password === password) {
        updateRoomWithJoinedUser(room, roomUser, callback);
    } else {
        callback(new Error('Wrong password'), null);
    }
}

function postRoomJoinUpdate(error, room, roomUser, callback) {
    if (error) console.error(error);
    else if (room) {
        maskRoom(roomUser.user, room);
        console.log('User ' + roomUser.user.name + ' has joined room ' + room.name);
        announceUserJoined(room._id, roomUser);
    }
    callback(error, room);
}

/**
 *
 * @param {Room} room
 * @param {RoomUser} roomUser
 * @param {Function<Error, Room>} callback
 */
function updateRoomWithJoinedUser(room, roomUser, callback) {
    listenToRoomWebsocket(room);
    if (roomContainsUser(room, roomUser.user)) {
        roomRepo.updateUserInRoom(room._id, roomUser, function (error, room) {
            postRoomJoinUpdate(error, room, roomUser, callback);
        });
    } else {
        roomRepo.pushUserToRoom(room._id, roomUser, function (error, room) {
            postRoomJoinUpdate(error, room, roomUser, callback);
        });
    }
}

function listenToRoomWebsocket(room) {
    // var socket = websocket.getRoomSocket(room._id);
    // var news = io
    //     .of()
    //     .on('connection', function (socket) {
    //         socket.emit('item', {news: 'item'});
    //     });
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

/**
 *
 * @param {User} user
 * @param {Room} room
 */
function maskRoom(user, room) {
    if (user._id.equals(room.owner._id)) {
        room.possession = 'OWNED';
    } else if (roomContainsUser(room, user)) {
        room.possession = 'JOINED';
    } else {
        room.possession = 'ACCESSIBLE';
    }
    room.users.forEach(function (roomUser) {
        maskUser(roomUser.user);
    });
    maskUser(room.owner);
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
 * @param {User} user
 */
function maskUser(user) {
    user.accessToken = null;
    user.accessTokenExpiry = null;
    user.googleId = null;
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
        return user._id.equals(roomUser.user._id);
    });
}

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom,
    getRoomsForUser: getRoomsForUser,
    joinRoom: joinRoom,
    sendNoteToRoom: sendNoteToRoom
};