const movieModel = require('../models/movie-model')
const collection = {
	ALL: 0,
	UPCOMING:1,
	MARVEL: 2,
	POPULAR: 3,
	TOP_RATED: 4,
}
const url ={
    UPCOMING:'https://api.themoviedb.org/3/movie/upcoming?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
	MARVEL: 'https://api.themoviedb.org/4/list/1?api_key=77fe21586542a5f94b267c25d0030747',
	POPULAR: 'https://api.themoviedb.org/3/movie/popular?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
	TOP_RATED: 'https://api.themoviedb.org/3/movie/top_rated?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
}

const maxPages = {
    MARVEL : 3,
    ALL: 635,
    UPCOMING: 11,
	POPULAR: 500,
	TOP_RATED: 425,

}

//Show all movies
async function getAllMovies(req, res) {
   await movieModel[collection.ALL].find((err, results) => {
        err && results.status(400).json({success: false,error: err});
        !results.length && res.status(404).json({success: false,message: 'No movies available'})
        console.log('results: ', JSON.stringify(results))
        res.status(200).json({
        success: true,
            data: results
        })
    }).limit(20).skip((req.params.page -1) * 20)
}

//Show ALL marvel movies
async function getMarvelMoviesAll(req, res) {
    await movieModel[collection.MARVEL].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     })
 }

 //Show page from marvel movies
async function getMarvelMoviesPage(req, res) {
    let page = (req.params.page < 1 || req.params.page > 3 ) ? 1 : req.params.page
    await movieModel[collection.MARVEL].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     }).limit(20).skip((page -1) * 20)
 }

 //Show popular movies
async function getPopularMovies(req, res) {
    await movieModel[collection.POPULAR].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     }).limit(20).skip((req.params.page -1) * 20)
 }

  //Show top rated movies
async function getTopRatedMovies(req, res) {
    await movieModel[collection.TOP_RATED].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     }).limit(20).skip((req.params.page -1) * 20)
 }

  //Show upcoming movies
async function getUpcomingMovies(req, res) {
    await movieModel[collection.UPCOMING].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     }).limit(20).skip((req.params.page -1) * 20)
 }

//Save movie
async function saveMovie(req, res) {
    let newMovie = req.body.movie
    await movieModel[collection.MARVEL].insertMany(newMovie, (e) => {
        e && results.status(400).json({success: false,error: err})
        res.status(201).json({ success: true, data: newMovie})})
}

//Search movie by name
async function searchMovieByName(req, res) {
    let movieNameParam = req.params.movieName
    let queryByName = {title: {"$regex": movieNameParam,"$options": "i"}}
    await movieModel[collection.ALL].find(queryByName,(err, results) => {
        err && res.status(400).json({success: false,error: err})
        // if(results.length) return res.status(404).json({success: false,message: 'No movies available'})
        console.log("result:", JSON.stringify(results));
        res.status(200).json({success: true, data: results});}).limit(20)
}

//Remove movie by id
async function removeMovieById(req, res) {
    const id = req.params.id
    await movieModel[collection.MARVEL].findByIdAndRemove(id, (err, movie) => {
        err && res.status(400).json({success: false,error: err})
        movie === null && res.status(400).json({success: false,error: 'not found'})
        res.status(200).json({
            success: true,
            data: movie
        });
    })
}

//Update movie by id
async function updateMovie(req, res) {
    const id = req.params.id
    const newMovie = req.body.movie;
    movieModel[collection.ALL].findByIdAndUpdate(id, newMovie, (err) => {
        err && results.status(400).json({success: false,error: err})
        console.log('Changed successfully!')
        res.status(200).json({
            success: true,
            data: newMovie
        });
    })
}

// get Movies by category and page
async function getMoviesByPage(req, res) {
    let genreName = (req.path.split('/')[1]).toUpperCase()
    let page = (req.params.page < 1 || req.params.page > maxPages[genreName] ) ? 1 : req.params.page
    await movieModel[collection[genreName]].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     }).limit(20).skip((page -1) * 20)
 }
// get the
async function getAllMoviesByGenre(req, res) {
    let genreName = (req.path.split('/')[1]).toUpperCase()
    await movieModel[collection[genreName]].find((err, results) => {
         err && results.status(400).json({success: false,error: err});
         !results.length && res.status(404).json({success: false,message: 'No movies available'})
         console.log('results: ', JSON.stringify(results))
         res.status(200).json({
         success: true,
             data: results
         })
     })
 }

module.exports = {
    saveMovie,
    searchMovieByName,
    removeMovieById,
    updateMovie,
    getAllMovies,
    getMarvelMoviesAll,
    getMarvelMoviesPage,
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getMoviesByPage,
    getAllMoviesByGenre
}