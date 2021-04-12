import React, { useEffect, useState } from 'react'
import Card from './movie-card/Card'
import {getDataByPagesFromDB,getDataFromDB} from './service-folder/movies-service'
import './Home.css'
export default function Home({category,title,totalPages}) {
    const [movies, setMovies] = useState([])
    const [pageNow,setPageNow] = useState(1)
    async function showMovies(){
        console.log(category, pageNow);
        let moviesArray = await getDataByPagesFromDB(category,pageNow);
        setMovies(moviesArray)
    }
    useEffect(() => {
        showMovies()
    }, [pageNow])
    return (
        <div className="Home">  
            <h1>{title}</h1>
            <div className="movie-class">{(movies) && movies.map((item, i) => <Card key={i} movie={item} />)}</div>
            <button onClick={()=> pageNow <= totalPages && setPageNow(pageNow+1)}>Next Page</button>
            <button onClick={()=>pageNow > 1 && setPageNow(pageNow-1)}>Previous Page</button>
        </div>
    )
}
