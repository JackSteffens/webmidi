angular.module('WebMIDI').service('Command', function () {
    const minNote = 0;
    const maxNote = 127;
    var baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var notes = {}; // 60 = middle C (C3)

    this.getNote = getNote;
    this.getNumber = getNumber;

    function init() {
        initNotes();
    }

    function initNotes() {
        for (var startNote = minNote; startNote <= maxNote; startNote++) {
            notes[startNote] = getBaseNote(startNote) + getOctave(startNote);
        }
    }

    function getOctave(startNote) {
        var num = Math.floor((startNote - minNote) / 12);
        return num === 0 ? '' : num;
    }

    function getBaseNote(startNote) {
        var mod = startNote % 12;
        return baseNotes[mod];
    }

    function getNote(number) {
        return notes[number];
    }

    function getNumber(note) {
        return Object.keys(notes).find(function (key) {
            return notes[key] === note;
        });
    }

    init();
});

