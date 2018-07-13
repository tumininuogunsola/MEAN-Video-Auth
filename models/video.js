const mongoose = require('mongoose');
const config  = require('../config/database');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

module.exports = mongoose.model('video', videoSchema, 'videos');