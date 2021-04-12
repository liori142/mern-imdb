const API = 'http://localhost:8080/movies/'
const axios = require('axios').default;

//Get all movies from specific genre
export async function getDataFromDB(movieGenre) {
    let myData = await axios.get(`${API}${movieGenre}`)
    return myData.data.data
}
//Get all movies from specific genre and page
export async function getDataByPagesFromDB(movieGenre,page) {
    let myData = await axios.get(`${API}${movieGenre}/${page}`).then(res=>{
        return res.data.data
    }).catch(err=>{
        console.log(err)
    })
    return myData.data.data
}
//Remove specific movie by movie genre and id of movie
export async function removeFromDB(movieGenre, movieIndexArray) {
    let moviesData = await getDataFromDB(movieGenre)
    movieIndexArray.map(async (data) => {
        let id = moviesData[data.dataIndex]._id
        let name = moviesData[data.dataIndex].title
        console.log(id)
        await axios.delete(`${API}remove/${id}`, {
            data: {
                movie: `removed: ${name}, with id: ${id} `
            }
        });
    })
}

export async function addMovieToDB(movieObject){
    console.log(movieObject.title)
    axios.post(`${API}/saveMovie`, {
        movie:{
            adult: movieObject?.adult,
            backdrop_path: `https://image.tmdb.org/t/p/original${movieObject?.backdrop_path}`,
            genres: movieObject?.genres,
            _id: movieObject?.id,
            overview: movieObject?.overview,
            popularity: movieObject?.popularity,
            poster_path: `https://image.tmdb.org/t/p/original${movieObject?.poster_path}`,
            release_date: movieObject?.release_date,
            title: movieObject?.title,
            trailer: movieObject?.trailer,
            vote_average: movieObject?.vote_average,
            vote_count: movieObject?.vote_count
      }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

