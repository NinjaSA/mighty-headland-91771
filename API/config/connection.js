var mongoose = require('mongoose');
var userModel = require('../models/userModel');
var techniqueModel = require('../models/techniqueModel');

module.exports = function(config){
    mongoose.connect(config.DATABASE);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('NINJA DATABASE OPEN !!!');
    });
};
