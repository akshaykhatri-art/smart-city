const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    easeOfLiving: Number,
    municipalPerformance: Number,
    body: String
});

module.exports = mongoose.model('Review', reviewSchema);