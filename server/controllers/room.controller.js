var request = require('request');
var path = require('path');
var colors = require('colors');

/**
 *
 * @return {string}
 */
function createRoom() {
    return 'room-id';
}

/**
 *
 * @return {string}
 */
function joinRoom() {
    return 'shizzle'
}

/**
 *
 * @return {string[]}
 */
function getRooms() {
    return ['list_of_rooms'];
}

module.exports = {
    createRoom: createRoom,
    joinRoom: joinRoom,
    getRooms: getRooms
};