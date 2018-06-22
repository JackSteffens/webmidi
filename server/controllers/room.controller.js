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
                    res.status(500).send(error);
                } else {
                    res.send(room);
                }
            });
    } else {
        res.status(400).send('Invalid user or room name');
    }
}

/**
 * @param {String} req.body.roomId {@link Room._id}
 * @param {String} req.body.password {@link Room.password}
 * @param {Array<Number>} req.body.keys
 * @param {User} req.user
 * @return {Room|Error} Room object on success or Error on failure
 */
function joinRoom(req, res) {
    var roomId = req.body.roomId;
    var password = req.body.password;
    var keys = req.body.keys;
    var user = req.user;
    var validKeys = validateKeys(keys);

    if (!user) {
        res.status(401).send('Login Required');
    } else if (!roomId) {
        res.status(400).send('No room ID given');
    } else if (!validKeys) {
        res.status(400).send('No keyboard configured');
    } else {
        roomService.joinRoom(roomId, password, user, keys, function (error, room) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(room);
            }
        });
    }
}

/**
 *
 * @param {Object} req
 * @param {String} req.query.roomId
 * @param res
 */
function leaveRoom(req, res) {
    var roomId = req.query.roomId;
    var user = req.user;

    if (!user) {
        res.status(401).send('Login Required');
    } else if (!roomId) {
        res.status(400).send('No room ID given');
    } else {
        roomService.leaveRoom(roomId, user, function (error, room) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send();
            }
        });
    }
}


/**
 *
 * @param {Array<Number>} keys
 */
function validateKeys(keys) {
    if (keys && keys.length > 0) {
        var valid = true;
        keys.forEach(function (key) {
            if (!isValidKey(key)) {
                valid = false;
            }
        });
        return valid;
    }
    return false;
}

/**
 *
 * @param {Number} key
 * @return {boolean}
 */
function isValidKey(key) {
    return (typeof key === 'number' && key >= 0 && key <= 127);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
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
    leaveRoom: leaveRoom,
    getRooms: getRooms,
    getRoom: getRoom
};