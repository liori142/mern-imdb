const moviesRouter = require('express').Router()
const moviesController = require('../controllers/movieControl')
const genreArray = ['all','marvel','popular','top_rated','upcoming']

genreArray.forEach(genre=>{
//Find all movies by genre 
moviesRouter.get(`/${genre}`, moviesController.getAllMoviesByGenre)

//Find 20 movies by page and genre
moviesRouter.get(`/${genre}/:page`, moviesController.getMoviesByPage)
})

//Save movie 
moviesRouter.post('/saveMovie', moviesController.saveMovie)

//Search movie by name
moviesRouter.get("/search/:movieName", moviesController.searchMovieByName)

//Remove movie by id
moviesRouter.delete("/remove/:id", moviesController.removeMovieById)

//Update movie by id
moviesRouter.put("/update/:id", moviesController.updateMovie)

module.exports = moviesRouter

//Find all Movies
// moviesRouter.get('/all/:page', moviesController.getAllMovies)

//Find All marvel Movies
// moviesRouter.get('/marvel', moviesController.getAllMoviesByGenre)

//Find marvel Movies by Page
// moviesRouter.get('/marvel/:page', moviesController.getMoviesByPage)

//Find popular Movies
// moviesRouter.get('/popular/:page', moviesController.getMoviesByPage)

//Find top rated Movies
// moviesRouter.get('/top_rated/:page', moviesController.getMoviesByPage)

//Find upcoming Movies
// moviesRouter.get('/upcoming', moviesController.getAllMoviesByGenre)
