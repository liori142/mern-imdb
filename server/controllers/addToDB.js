const fetch = require("node-fetch");
const movieModel = require('../models/movie-model')
const collection = {
    ALL: 0,
    UPCOMING: 1,
    MARVEL: 2,
    POPULAR: 3,
    TOP_RATED: 4,
}
const url = {
    UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
    MARVEL: 'https://api.themoviedb.org/4/list/1?api_key=77fe21586542a5f94b267c25d0030747',
    POPULAR: 'https://api.themoviedb.org/3/movie/popular?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
    TOP_RATED: 'https://api.themoviedb.org/3/movie/top_rated?api_key=77fe21586542a5f94b267c25d0030747&language=en-US',
}
const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}


// Inserts movies by api to db
async function insertMovies(url, collection) {
    try {
        let movieNumber = 1
        const dataFirst = await (await fetch(url)).json()
        const totalPages = dataFirst.total_pages
        const total_results = dataFirst.total_results
        for (let page = 1; page <= totalPages; page++) {
            const rdyUrl = `${url}&page=${page}`
            const data = await (await fetch(rdyUrl)).json()
            const moviesArray = data.results;
            await moviesArray.forEach(movie => {
                const myMoviesRdy = rdyMovieObject(movie)
                myMoviesRdy.then(movieObj => {
                    movieModel[collection].insertMany(movieObj.movie, (e) => {
                        movieNumber += 1
                        if (e) {
                            console.log('some error')
                        } else {
                            console.log(`${Number.parseInt((movieNumber / total_results)*100)}%/100% ------- injected ${movieObj.movie.title}`)
                        }
                    })
                })
            })
        }
        console.log(`successfully injected! ${movieNumber}/${total_results}`)

    } catch (e) {
        console.log(e)
    }
}

// Build obj model
async function rdyMovieObject(movie) {
    let trailerRdy;
    await getTrailer(movie.id).then(res => {
        trailerRdy = res
    })
    return {
        movie: {
            adult: movie?.adult,
            backdrop_path: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
            genres: movie?.genre_ids.map((id) => genres[id]),
            _id: movie?.id,
            overview: movie?.overview,
            popularity: movie?.popularity,
            poster_path: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
            release_date: movie?.release_date,
            title: movie?.title,
            trailer: trailerRdy,
            vote_average: movie?.vote_average,
            vote_count: movie?.vote_count
        }
    }
}

// Get trailer 
async function getTrailer(id) {
    let data = await (await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=77fe21586542a5f94b267c25d0030747&language=en-US`)).json();
    return data?.results?.length > 0 ? `https://www.youtube.com/watch?v=${data.results[0].key}` : 'N/A'
}

//drop all collections if exists
async function dropItAll() {
    try {
        for (const key in collection) {
            if (movieModel[collection[key]]) {
                movieModel[collection[key]].collection.drop((err, result) => {
                    if (err) return err;
                    result && console.log("Collection successfully deleted.");
                });
            }
        }
    } catch (error) {
        console.log(error)
    }
}

//drop specific collection by genre for example 'collection.MARVEL'
async function dropSpecificCollection(genre) {
        try {
            console.log('asdasd')
            movieModel[genre].collection.drop((err, result) => {
                    if (err) return err;
                    result && console.log(collection+ "Collection successfully deleted.");
                })
            }
            catch (error) {
                console.log(error)
            }
}

//create all collections
async function createAllCollections() {
            for (const collectionKey in collection) {
                if (collectionKey === 'ALL') {
                    for (const urlKey in url) {
                        await insertMovies(url[urlKey], collection.ALL)
                    }
                } else {
                    await insertMovies(url[collectionKey], collection[collectionKey])
                }
            }
}



insertMovies('MARVEL','MARVEL')
console.log('asd')
