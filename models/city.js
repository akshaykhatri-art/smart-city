const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    // title: String,
    description: String,
    image: String,
    cityname: String,
    state: String,
    population: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CitySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('City', CitySchema);