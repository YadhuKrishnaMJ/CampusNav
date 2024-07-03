const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
