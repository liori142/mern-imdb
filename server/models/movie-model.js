const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Movie = new Schema({
    adult: {
        type: Boolean
    },
    backdrop_path: {
        type: String
    },
    genres: {
        type: Array
    },
    _id: {
        type: Number
    },
    overview: {
        type: String
    },
    popularity: {
        type: Number
    },
    poster_path: {
        type: String
    },
    release_date: {
        type: String
    },
    title: {
        type: String
    },
    trailer: {
        type: String
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = [
    mongoose.model('all-movies', Movie),
     mongoose.model('upcoming-movies', Movie),
     mongoose.model('marvel-movies', Movie),
     mongoose.model('popular-movies', Movie),
     mongoose.model('top-rated-movies', Movie),
    ]