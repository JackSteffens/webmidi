var path = require('path');
var roomService = require(path.resolve(__dirname + '/../services/room.service.js'));

/**
 *
 * @return {string}
 */
function createRoom(req, res) {
    // FIXME there's no such thing as req.user without the use of passport.js
    var roomName = req.body.name;
    console.log(req.body);
    var user = req.user;
    console.log(user);
    console.log(req.session);
    console.log(req.cookies);
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
    var user = req.user;
    if (user) {
        roomService.getRoomsForUser(user, function (error, rooms) {
            if (error) {
                res.status(500);
                next(error)
            } else {
                res.send(rooms);
            }
        });
    } else {
        res.status(400).send('Login required');
    }
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