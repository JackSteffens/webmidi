var path = require('path');
var Room = require(path.resolve(__dirname + '/../models/room.model.js')).Room;

/**
 * TODO Promise instead of Callback
 * @param roomId
 * @param callback
 */
function getRoom(roomId, callback) {
    Room.findOne({
        '_id': roomId
    }, function (error, room) {
        return callback(error, room);
    });
}

/**
 * TODO Promise instead of Callback
 * @param {String} roomId
 * @param {User} user
 * @param {Function} callback
 */
function updateRoomUsers(roomId, user, callback) {
    Room.findByIdAndUpdate(
        roomId,
        {"$push": {"users": user}},
        {"new": true, "upsert": true},
        function (error, room) {
            callback(error, room);
        });
}

/**
 * TODO Promise instead of Callback
 * @param callback
 */
function getRooms(callback) {
    Room.find({}, function (error, rooms) {
        return callback(error, rooms);
    });
}

/**
 * TODO Promise instead of Callback
 */
function createRoom(room, callback) {
    Room.create(room, function (error, newRoom) {
        return callback(error, newRoom);
    });
}

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom,
    getRooms: getRooms,
    updateRoomUsers: updateRoomUsers
};