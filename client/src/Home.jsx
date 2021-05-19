import React, { useEffect, useState } from 'react'
import Card from './movie-card/Card'
import {getDataByPagesFromDB,findMovies} from './service-folder/movies-service'
import './Home.css'
export default function Home({category,title,totalPages,isSearch}) {
    const [movies, setMovies] = useState([])
    const [pageNow,setPageNow] = useState(1)
    const [search,setSearch] = useState(false)
    async function showMovies(){
        setSearch(isSearch)
        console.log(category,title,totalPages);
        let moviesArray = search ? await findMovies(title) : await getDataByPagesFromDB(category,pageNow); 
        // let moviesArray = await getDataByPagesFromDB(category,pageNow);
        setMovies(moviesArray)
    }
    useEffect(() => {
        showMovies()
    }, [pageNow,category])
    return (
        <div className="Home">  
            <h1>{title}</h1>
            <div className="movie-class">{(movies) && movies.map((item, i) => <Card key={i} movie={item} />)}</div>
            <button onClick={()=> pageNow <= totalPages && setPageNow(pageNow+1)}>Next Page</button>
            <button onClick={()=>pageNow > 1 && setPageNow(pageNow-1)}>Previous Page</button>
        </div>
    )
}
