var path = require('path');
var roomService = require(path.resolve(__dirname + '/../services/room.service.js'));

/**
 *
 * @return {string}
 */
function createRoom(req, res) {
    // FIXME there's no such thing as req.user without the use of passport.js
    var roomName = req.body.name;
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
    var password = req.body.password;
    var user = req.user;
    if (roomId && user) {
        roomService.joinRoom(roomId, password, user, function (error, room) {
            if (error) {
                res.status(500);
                next(error);
            } else {
                res.send(room);
            }
        });
    } else if (!user) {
        res.status(401).send('Login Required');
    } else {
        res.status(400).send('No room ID given');
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
        res.status(401).send('Login required');
    }
}

function getRoom(req, res) {
    var roomId = req.body.roomId || req.query.roomId;
    var user = req.user;
    if (roomId && user) {
        roomService.getRoom(roomId, user, function (error, room) {
            if (error) {
                res.status(500);
                next(error);
            } else {
                res.send(room);
            }
        });
    } else if (!user) {
        res.status(401).send('Login Required');
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