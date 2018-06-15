var path = require('path');
var roomService = require(path.resolve(__dirname + '/../services/room.service.js'));

/**
 *
 * @return {string}
 */
function createRoom(req, res) {
    // FIXME there's no such thing as req.user without the use of passport.js
    var roomName = req.body.roomName;
    var user = req.user;
    if (roomName && user) {
        roomService.createRoom(roomName, user,
            function (error, room) {
                if (error) {
                    res.status(500);
                    next(error);
                } else {
                    res.send(room);
                }
            });
    } else {
        res.status(400).send('Invalid user or room name');
    }
}

/**
 *
 * @return {string}
 */
function joinRoom(req, res) {
    var roomId = req.body.roomId;
    var user = req.user;
    if (roomId && user) {
        roomService.joinRoom(roomId, user, function (error, room) {
            if (error) {
                res.status(500);
                next(error);
            } else {
                res.send(room);
            }
        });
    } else {
        res.status(400).send('Invalid room');
    }
}

/**
 *
 * @return {string[]}
 */
function getRooms(req, res) {
    roomService.getRooms(function (error, rooms) {
        if (error) {
            res.status(500);
            next(error)
        } else {
            res.send(rooms);
        }
    });
}

function getRoom(req, res) {
    var roomId = req.body.roomId || req.query.roomId;
    if (roomId) {
        roomService.getRoom(roomId, function (error, room) {
            if (error) {
                res.status(500);
                next(error);
            } else {
                res.send(room);
            }
        });
    } else {
        res.status(400).send('No room ID given');
    }
}

module.exports = {
    createRoom: createRoom,
    joinRoom: joinRoom,
    getRooms: getRooms,
    getRoom: getRoom
};