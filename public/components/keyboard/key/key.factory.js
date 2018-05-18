'use strict';
angular.module('WebMIDI').factory('Key', function (Command) {
    return function Key(note) {
        var number = null;
        if (note && typeof note === 'number') {
            number = note;
            note = Command.getNote(note);
        }

        if (note && typeof note === 'string') {
            this.note = note;
            this.number = number ? number : Command.getNumber(note);
            this.octave = getOctave(note);
            this.sharp = isSharp(note);
            this.active = false;
        } else {
            throw new TypeError('No note given');
        }
    };

    /**
     * TODO
     * @param {String} note
     * @return {Boolean} isSharp
     */
    function isSharp(note) {
        return note.includes('#');
    }

    /**
     * TODO
     * @param {String} note
     * @return {Number} octave
     */
    function getOctave(note) {
        var octave = Number(note.match(new RegExp('\\d', 'g'))[0]);
        return octave ? octave : 0;
    }
});