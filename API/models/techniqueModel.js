var mongoose = require('mongoose');

var techniqueSchema = new mongoose.Schema({
    "name": String,
    "description": String,
    "videoUrl": String,
    "image": String,
    "group": String,
    "category": String,
    "uploadedBy": String
});

module.exports = mongoose.model('Technique', techniqueSchema);
