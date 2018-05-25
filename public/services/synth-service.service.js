'use strict';
angular.module('WebMIDI').service('SynthService', function () {
    this.synth = new Tone.PolySynth(10).toMaster();
    // this.synth = new Tone.Sampler('../sounds/0000_FluidR3_GM_sf2_file.js').toMaster();
});