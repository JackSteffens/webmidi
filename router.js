exports.setRequestUrl = function(app) {
    // # Controllers #
    var config = require(__dirname+'/config.js');
    // var pokedex = require("./controllers/pokedex.controller.js");

    // # Routing #
    // Pokedex
    // app.get('/api/pokedex', pokedex.getPokedex);

    // Web application index
    app.get('/', function(req, res) {
        res.sendFile(__dirname+'/public/root.html');
    });
};
